import React, { useState, useEffect, useRef  } from 'react';
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
            // messagesList = snapshot.val();
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
            const messageInfo = {
                name: userName,
                message: message,
                profilePic: userImg,
                userId: userId
            }
            let newMessage = {};
            var newPostKey = firebase.database().ref().child('chatMessages').push().key;
            newMessage['/chatMessages/' + newPostKey] = messageInfo;
            firebase.database().ref().update(newMessage);
            event.target.value = '';

        }
    }
    const messagesArr = [];
    for (const message in messagesList) {
        messagesArr.push(messagesList[message])
    }
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
      }, [messagesArr]);
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
                            <div className={classes.ChatContainer}>
                                <div className={classes.textContainer}>
                                    <div className={classes.ImgContainer}>
                                        <img src={message.profilePic} alt="profile" />
                                    </div>
                                    <div className={classes.text}>
                                        <span>{message.name}</span>
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