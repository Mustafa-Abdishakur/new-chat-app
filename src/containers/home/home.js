import React from 'react';
import image from '../../img/blank-profile.png';
import classes from './home.module.css';

const home = () => {
    return (
        <div className={classes.HomeContainer}>
            <div className={classes.SignOutBtn}>
                <button>Sign out</button>
            </div>
            <div className="header-container">
                <h1>Welcome to chat App</h1>
            </div>
            <div className={classes.ChatContainer}>
                <div className={classes.textContainer}>
                    <div className={classes.ImgContainer}>
                        <img src={image} alt="profile"/>
                    </div>
                    <div className={classes.text}>
                        <span>Mustafa Abdishakur</span>
                        <span>hello world</span>
                    </div>
                </div>
                  <div className={classes.textContainer}>
                    <div className={classes.ImgContainer}>
                        <img src={image} alt="profile"/>
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

export default home;