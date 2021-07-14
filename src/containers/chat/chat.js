import React, { useState, useEffect } from 'react';
import ChatMessages from '../chatMessages/chatMessages';
import GroupsList from '../groupsList/groupsList';
import classes from './chat.module.css';
import firebase from "firebase/app";
import 'firebase/database';

const Chat = () => {
    const database = firebase.database();

    const [user, setUser] = useState({});
    const [messagesList, setMessagesList] = useState({});
    const [lastMessage, setLastMessage] = useState({});
    const [groups, setGroups] = useState({});
    const [groupId, setGroupId] = useState('generalChat');

    useEffect(() => {
        setUser({
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            image: localStorage.getItem('profileImg'),
            id: localStorage.getItem('uid'),
            memberOfGroup: {
                generalChat: true
            },
        });
    }, []);
    //get group messages
    useEffect(() => {
        let messagesRef = database.ref('group messages/' + groupId + '/messages');
        messagesRef.on('value', (snapshot) => {
            const messages = snapshot.val();
            // console.log(messages)
            const lastMessageKey = Object.keys(messages)[Object.keys(messages).length - 1];
            // console.log(messages[lastMessageKey])
            setLastMessage(messages[lastMessageKey]);
            setMessagesList(messages);
        });
        // get groups info
        let groupsRef = database.ref('users/' + user.id + '/groups');
        groupsRef.on('value', (snapshot) => {
            // console.log(snapshot.val())
            setGroups(snapshot.val());
        })
    }, [database, groupId, user.id]);

    //add user or get user data 
    useEffect(() => {
        const database = firebase.database();
        database.ref().child("users").get().then((snapshot) => {
            if (snapshot.exists()) {
                const userInfo = database.ref().child("users").child(user.id);
                userInfo.get().then((snapshot) => {
                    if (snapshot.exists()) {
                        // user already exists
                    } else {
                        //add user to the database
                        let addUser = {};
                        addUser['users/' + user.id] = user;
                        return database.ref().update(addUser);
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                database.ref('users/' + user.id).set({
                    ...user
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [user]);

    //chat input
    const chatInputHandler = event => {
        const message = event.target.value;
        if (event.keyCode === 13) {
            const newPostKey = database.ref().child('group messages').child(groupId).child('messages').push().key;
            const date = new Date();
            const currentDate = date.getDate() + '/' + (date.getMonth() + 1);
            const currentTime = date.getHours() + ':' + date.getMinutes();

            const messageInfo = {
                name: user.name,
                message: message,
                profilePic: user.image,
                userId: user.id,
                key: newPostKey,
                messageDate: currentDate,
                messageTime: currentTime
            }

            let newMessage = {};
            newMessage['group messages/' + groupId + '/messages/' + newPostKey] = messageInfo;
            newMessage['group messages/' + groupId + '/lastMessage'] = messageInfo;
            database.ref().update(newMessage);
            event.target.value = '';

        }
    }
    //get group's messages
    const groupClickHandler = (group) => {
        // console.log(group)
        if (group.key) {
            setGroupId(group.key);
        } else {
            setGroupId('generalChat');
        }
    }
    //add new group
    const addGroupHandler = (event, newGroup) => {
        event.preventDefault();
        // console.log(newGroup)
        const newPostKey = database.ref().child('users').child(user.id).child('groups').push().key;
        const newMessageKey = database.ref().child('group messages').child(newPostKey).child('messages').push().key;
        let addGroup = {};
        addGroup['users/' + user.id + '/groups/' + newPostKey] = {
            name: newGroup,
            admin: true,
            key: newPostKey,
        };
        // addGroup['users/' + props.user.id + '/memberOfGroup/' + newPostKey] = { name: newGroup };
        const date = new Date();
        const currentDate = date.getDate() + '/' + (date.getMonth() + 1);
        const currentTime = date.getHours() + ':' + date.getMinutes();
        const messageInfo = {
            name: user.name,
            message: `'${newGroup}' group was created`,
            profilePic: user.image,
            userId: user.id,
            key: newPostKey,
            messageDate: currentDate,
            messageTime: currentTime
        }
        addGroup['group messages/' + newPostKey + '/lastMessage'] = messageInfo;

        addGroup['group messages/' + newPostKey + '/messages/' + newMessageKey] = {
            message: `'${newGroup}' group was created`,
            key: newMessageKey,
            profilePic: user.image,
            name: user.name
        };
        setGroupId(newPostKey);
        return database.ref().update(addGroup);
    }
    //turn the messages into an array 
    const messagesArr = [];
    for (const message in messagesList) {
        messagesArr.push(messagesList[message])
    }
  
    //turn groups into an array 
    const groupsArr = [];
   for (const groupKey in groups) {
            let groupInfo = groups[groupKey];
            let lastMessage = '';
            let lastMessageRef = database.ref('group messages/' + groupKey + '/lastMessage');
            lastMessageRef.on('value', (snapshot) => {
                // console.log(snapshot.val())
                lastMessage = snapshot.val();
                groupInfo.lastMessage = lastMessage;
                groupsArr.push(groupInfo);
            })
        } 

  
    // console.log(groups)

    return (
        <div className={classes.HomeContainer}>
            <GroupsList user={user} lastMessage={lastMessage} groups={groupsArr} groupClickHandler={groupClickHandler} addGroup={addGroupHandler} />
            <ChatMessages messagesArr={messagesArr} chatInputHandler={chatInputHandler} />
        </div>
    )
}

export default Chat;