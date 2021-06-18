import React, { useState, useEffect, useRef } from 'react';
import classes from './chatPage.module.css';
import firebase from "firebase/app";
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
        var messagesRef = firebase.database().ref('chatMessages');
        messagesRef.on('value', (snapshot) => {
            setMessagesList(snapshot.val());
        });
    }, []);

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setUserName(null);
            setUserEmail(null);
            setUserImg(null);
            localStorage.clear();
            window.location = '/';
        }).catch((error) => {
            alert('oops, something happened. I will redirect you to the sign in page');
        });
    }
    const chatInputHandler = event => {
        const message = event.target.value;
        if (event.keyCode === 13) {
            const newPostKey = firebase.database().ref().child('chatMessages').push().key;
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
                messageTime:currentTime
            }
            let newMessage = {};
            newMessage['/chatMessages/' + newPostKey] = messageInfo;
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
    return (
        <div className={classes.HomeContainer}>
            <div className={classes.SignOutBtn}>
                <button onClick={signOut}>Sign out</button>
            </div>
            <div className={classes.midContainer}>
                <div className="header-container">
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
            </div>
            <div className={classes.InputContainer}>
                <input type="text" placeholder="type your message..." onKeyUp={chatInputHandler} />
            </div>
        </div>
    )

}
export default ChatPage;