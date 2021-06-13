import React, { Component, useState, useEffect } from 'react';
import image from '../../img/blank-profile.png';
import classes from './chatPage.module.css';
import firebase from "firebase/app";

const ChatPage = () => {

    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userImg, setUserImg] = useState(null);

    useEffect(() => {
        setUserName(localStorage.getItem('name'));
        setUserEmail(localStorage.getItem('email'));
        setUserImg(localStorage.getItem('profileImg'));
    }, [userName, userEmail, userImg]);

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
    return (
        <div className={classes.HomeContainer}>
            <div className={classes.SignOutBtn}>
                <button onClick={signOut}>Sign out</button>
            </div>
            <div className="header-container">
                <h1>Welcome to chat App</h1>
            </div>
            <div className={classes.ChatContainer}>
                <div className={classes.textContainer}>
                    <div className={classes.ImgContainer}>
                        <img src={image} alt="profile" />
                    </div>
                    <div className={classes.text}>
                        <span>Mustafa Abdishakur</span>
                        <span>hello world</span>
                    </div>
                </div>
                <div className={classes.textContainer}>
                    <div className={classes.ImgContainer}>
                        <img src={image} alt="profile" />
                    </div>
                    <div className={classes.text}>
                        <span>Mustafa Abdishakur</span>
                        <span>hello world</span>
                    </div>
                </div>
            </div>
            <div className={classes.InputContainer}>
                <input type="text" placeholder="type your message..." />
            </div>
        </div>
    )

}
export default ChatPage;