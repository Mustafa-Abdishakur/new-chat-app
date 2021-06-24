import React, { useState, useEffect, useRef } from 'react';
import classes from './chatPage.module.css';
import firebase from "firebase/app";
import GroupsList from '../groupsList/groupsList';

const ChatPage = () => {

    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userImg, setUserImg] = useState(null);
    const [userId, setUserId] = useState(null);
    const [messagesList, setMessagesList] = useState({});

    useEffect(() => {
        setUserName(localStorage.getItem('name'));
        setUserEmail(localStorage.getItem('email'));
        setUserImg(localStorage.getItem('profileImg'));
        setUserId(localStorage.getItem('uid'));
    }, [userName, userEmail, userImg, userId]);

    useEffect(() => {
        let messagesRef = firebase.database().ref('General Chat');
        messagesRef.on('value', (snapshot) => {
            setMessagesList(snapshot.val());
        });
    }, []);

    const chatInputHandler = event => {
        const message = event.target.value;
        if (event.keyCode === 13) {
            const newPostKey = firebase.database().ref().child('General Chat').push().key;
            const date = new Date();
            const currentDate = date.getDate() + '/' + (date.getMonth() + 1);
            const currentTime = date.getHours() + ':' + date.getMinutes();
            const messageInfo = {
                name: userName,
                message: message,
                profilePic: userImg,
                userId: userId,
                key: newPostKey,
                messageDate: currentDate,
                messageTime: currentTime
            }
            let newMessage = {};
            newMessage['General Chat/' + newPostKey] = messageInfo;
            firebase.database().ref().update(newMessage);
            event.target.value = '';

        }
    }

    const messagesArr = [];
    for (const message in messagesList) {
        messagesArr.push(messagesList[message])
    }

    //Automatic scroll to the end of chat
    const messagesEndRef = useRef(null)
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    });
    const userInfo = {
        userName,
        userEmail,
        userImg,
        userId,
    }
    return (
        <div className={classes.HomeContainer}>
            <GroupsList user={userInfo}/>
            <div className={classes.midContainer}>
                <div className={classes.headerContainer}>
                    <h1>Welcome to chat App</h1>
                </div>
                <div className={classes.mainChatContainer}>
                    {messagesArr.map(message => {
                        return (
                            <div className={classes.ChatContainer} key={message.key}>
                                <div className={classes.textContainer}>
                                    <div className={classes.ImgContainer}>
                                        <img src={message.profilePic} alt="profile" />
                                    </div>
                                    <div className={classes.text}>
                                        <div className={classes.topText}>
                                            <span>{message.name}</span>
                                            <span>{message.messageDate} {message.messageTime}</span>
                                        </div>
                                        <span>{message.message}</span>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>
                <div className={classes.InputContainer}>
                    <input type="text" placeholder="type your message here..." onKeyUp={chatInputHandler} />
                </div>
            </div>

        </div>
    )

}
export default ChatPage;