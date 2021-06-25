import React, { useState, useEffect } from 'react';
import ChatMessages from '../chatMessages/chatMessages';
import GroupsList from '../groupsList/groupsList';
import classes from './chat.module.css';
import firebase from "firebase/app";
import 'firebase/database';

const Chat = () => {
    const database = firebase.database();

   /*  const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userImg, setUserImg] = useState(null);
    const [userId, setUserId] = useState(null); */
    const [user, setUser] = useState({});
    const [messagesList, setMessagesList] = useState({});

    useEffect(() => {
      /*   setUserName(localStorage.getItem('name'));
        setUserEmail(localStorage.getItem('email'));
        setUserImg(localStorage.getItem('profileImg'));
        setUserId(localStorage.getItem('uid')); */
        setUser({
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            image: localStorage.getItem('profileImg'),
            id: localStorage.getItem('uid')
        });
    }, []);

    useEffect(() => {
        let messagesRef = database.ref('General Chat');
        messagesRef.on('value', (snapshot) => {
            setMessagesList(snapshot.val());
        });
    }, [database]);

    //add user or get user data 
    useEffect(() => {
        const database = firebase.database();
        database.ref().child("users").get().then((snapshot) => {
            if (snapshot.exists()) {
                database.ref().child("users").child(user.id).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        // user already exists
                        return;
                    } else {
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
    const chatInputHandler = event => {
        const message = event.target.value;
        if (event.keyCode === 13) {
            const newPostKey = database.ref().child('General Chat').push().key;
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
            newMessage['General Chat/' + newPostKey] = messageInfo;
            database.ref().update(newMessage);
            event.target.value = '';

        }
    }
    //messages retrieved from database
    const messagesArr = [];
    for (const message in messagesList) {
        messagesArr.push(messagesList[message])
    }

  /*   const userInfo = {
        userName,
        userEmail,
        userImg,
        userId,
    } */
    return (
        <div className={classes.HomeContainer}>
            <GroupsList user={user} />
            <ChatMessages messagesArr={messagesArr} chatInputHandler={chatInputHandler} />
        </div>
    )
}

export default Chat;