import React, { useState } from 'react';
// import profilePic from '../../img/blank-profile.png';
import settings from '../../img/options.png';
import classes from './groupsList.module.css';
import firebase from "firebase/app";
import 'firebase/database';

const signOut = () => {
    firebase.auth().signOut().then(() => {
        localStorage.clear();
        window.location = '/';
    }).catch((error) => {
        alert('oops, something happened when trying to log out');
    });
}
const GroupsList = (props) => {
    const [displaySettings, setDisplaySettings] = useState(false);
    const settingsHandler = () => {
        if (displaySettings) {
            setDisplaySettings(false);
        } else {
            setDisplaySettings(true);
        }
    }
    return (
        <div className={classes.mainContainer} >
            <div className={classes.infoContainer}>
                <img src={props.user.image} alt='' />
                <span>{props.user.name}</span>
                <div className={classes.dropdown} onClick={settingsHandler}>
                    <img src={settings} alt='' />
                    <div className={displaySettings ? [classes.dropdownContent, classes.viewSettings].join(' ') : classes.dropdownContent}>
                        <p>Edit profile</p>
                        <p>Create group</p>
                        <p onClick={signOut}>Sign out</p>
                    </div>
                </div>
            </div>
            <div className={classes.groupsContainer}>
                <div className={classes.group}>
                    {/* <img src={profilePic} alt='' /> */}
                    <div className={classes.groupInfoContainer}>
                        <span>General chat</span>
                        <span>00:00</span>
                        <span>Last text</span>
                    </div>
                </div>
                <div className={classes.group}>
                    {/* <img src={profilePic} alt='' /> */}
                    <div className={classes.groupInfoContainer}>
                        <span>Group name</span>
                        <span>00:00</span>
                        <span>Last text</span>
                    </div>
                </div>
                <div className={classes.group}>
                    {/* <img src={profilePic} alt='' /> */}
                    <div className={classes.groupInfoContainer}>
                        <span>Group name</span>
                        <span>00:00</span>
                        <span>Last text</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default GroupsList;