import React, { useState, useEffect } from 'react';
import ChatMessages from '../chatMessages/chatMessages';
import GroupsList from '../groupsList/groupsList';
import classes from './chat.module.css';
import firebase from "firebase/app";
import 'firebase/database';
import GroupInfo from '../groupInfo/groupInfo';
const Chat = () => {
    const database = firebase.database();

    const [user, setUser] = useState({});
    // const [messagesList, setMessagesList] = useState({});
    // const [lastMessage, setLastMessage] = useState({});
    const [groups, setGroups] = useState({});
    const [groupId, setGroupId] = useState('generalChat');
    const [groupInfo, setGroupInfo] = useState({});
    const [groupMembers, setGroupMembers] = useState({});
    const [listOfUsers, setListOfUsers] = useState([])
    //set user info and list of users of the app
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
    //get group info
    useEffect(() => {
        let messagesRef = database.ref('group messages/' + groupId);
        messagesRef.on('value', (snapshot) => {
            const groupInfo = snapshot.val();
            // setLastMessage(groupInfo.lastMessage);
            // setMessagesList(groupInfo.messages);
            setGroupInfo({
                messages: {
                    ...groupInfo.messages
                },
                lastMessage: {
                    ...groupInfo.lastMessage
                },
                groupName: groupInfo.groupName

            })
            setGroupMembers(groupInfo.members)
        });
        // get groups info
        let groupsRef = database.ref('users/' + user.id + '/groups');
        groupsRef.on('value', (snapshot) => {
            // console.log(snapshot.val())
            setGroups(snapshot.val());
        })
    }, [database, groupId, user.id]);

    // add/get user data and list of app users 
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
        //get list of users of the app / add user to the list
        let usersRef = database.ref().child('listOfUsers');
        usersRef.get().then((snapshot) => {
            if (snapshot.exists()) {
                const listOfUsers = snapshot.val();
                try {
                    const userRef = usersRef.child(user.id);
                    userRef.get().then((snapshot) => {
                        if (snapshot.exists()) {
                            arrOfUsers(listOfUsers);
                        } else {
                            let addUser = {};
                            const newUser = {
                                name: user.name,
                                image: user.image,
                                id: user.id
                            };
                            arrOfUsers({
                                ...listOfUsers,
                                newUser
                            })
                            addUser['listOfUsers/' + user.id] = newUser;
                            return database.ref().update(addUser);
                        }
                    })
                } catch (err) {
                    // console.log(err);
                }
            } else {
                let addUser = {};
                const newUser = {
                    name: user.name,
                    image: user.image,
                    id: user.id
                };
                arrOfUsers(newUser);
                addUser['listOfUsers/' + user.id] = newUser;
                return database.ref().update(addUser);
            }
        })
    }, [user]);

    const arrOfUsers = (users) => {
        const listOfUsers = [];
        for (const user in users) {
            listOfUsers.push(users[user]);
        }
        setListOfUsers(listOfUsers);
    }
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

        addGroup['group messages/' + newPostKey + '/members/' + user.id] = {
            name: user.name,
            image: user.image,
            id: user.id,
            admin: true
        };
        addGroup['group messages/' + newPostKey + '/groupName'] = newGroup;
        setGroupId(newPostKey);
        return database.ref().update(addGroup);
    }
    //turn the messages into an array 
    const messagesArr = [];
    for (const message in groupInfo.messages) {
        messagesArr.push(groupInfo.messages[message])
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
    //add member to the current group
    const addToGroupHandler = (groupId, user) => {
        //update groupInfo
        const membersArr = [];
        //loop through group members 

            //check if admin
            // console.log(user)
            if (groupMembers.hasOwnProperty(user.id)) {
                if (groupMembers[user.id].hasOwnProperty('admin')) {
                    if (groupMembers[user.id].admin === true) {
                        alert('you are the admin of the group');
                        return;
                    }
                } else {
                    alert('user already exits in the group');
                    return;
                }

            } else {
                //check if clicked member is already in the group (skip if he already is or add if he isn't) 
                let addMember = {};
                addMember['group messages/' + groupId + '/members/' + user.id] = user;
                return database.ref().update(addMember);

        }

    }

    return (
        <div className={classes.HomeContainer}>
            <GroupsList user={user} lastMessage={groupInfo.lastMessage} groups={groupsArr} groupClickHandler={groupClickHandler} addGroup={addGroupHandler} />
            <ChatMessages messagesArr={messagesArr} chatInputHandler={chatInputHandler} />
            <GroupInfo groupName={groupInfo.groupName} members={groupMembers} listOfUsers={listOfUsers} groupId={groupId} addToGroup={addToGroupHandler} />
        </div>
    )
}

export default Chat;