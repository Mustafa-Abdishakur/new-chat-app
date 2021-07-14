import React, { useState, useEffect } from 'react';
import settings from '../../img/options.png';
import classes from './groupsList.module.css';
import firebase from "firebase/app";
import 'firebase/database';
import NewGroup from '../../components/newGroup/newGroup';

const signOut = () => {
    firebase.auth().signOut().then(() => {
        localStorage.clear();
        window.location = '/';
    }).catch((error) => {
        alert('oops, something happened when trying to log out');
    });
}
const GroupsList = (props) => {
    const database = firebase.database();

    const [displaySettings, setDisplaySettings] = useState(false);
    const [displayNewGroup, setdisplayNewGroup] = useState(false);
    const [newGroup, setNewGroup] = useState('');
    const [groupsArr, setGroupsArr] = useState([]);
    const settingsHandler = () => {
        if (displaySettings) {
            setDisplaySettings(false);
        } else {
            setDisplaySettings(true);
        }
    }
    //display "new group" component
    const viewGroupHandler = () => {
        if (displayNewGroup) {
            setdisplayNewGroup(false);
        } else {
            setdisplayNewGroup(true);
        }
        setDisplaySettings(false);
    }
    //adding the new group
    const addGroupHandler = event => {
        props.addGroup(event, newGroup);
        setNewGroup('');
        viewGroupHandler();
    }

    //Handling the input when creating the new group
    const inputHandler = (event) => {
        setNewGroup(event.target.value);
    }
/* 
    useEffect(() => {
        setGroupsArr(props.groups);
    }, [props.groups]) */
    return (
        <div className={classes.mainContainer} >
            <div className={classes.infoContainer}>
                <div className={classes.profileInfo}>
                    <img src={props.user.image} alt='' />
                    <span>{props.user.name}</span>
                </div>
                <div className={classes.dropdown} onClick={settingsHandler}>
                    <img src={settings} alt='' />
                    <div className={displaySettings ? [classes.dropdownContent, classes.viewSettings].join(' ') : classes.dropdownContent}>
                        <p>Edit profile</p>
                        <p onClick={viewGroupHandler}>Create group</p>
                        <p onClick={signOut}>Sign out</p>
                    </div>
                </div>
            </div>
            <div className={classes.groupsContainer}>
                <div className={classes.group} onClick={props.groupClickHandler}>
                    <span>General chat</span>
                    <span>{/* {props.generalChat.messageTime} */}--</span>
                    <span>{/* {props.generalChat.message} */} --</span>
                </div>
                {
                    props.groups.map(group => {
                        return <div className={classes.group} onClick={() => props.groupClickHandler(group)} key={group.key}>
                            <span>{group.name ? group.name : '--'}</span>
                            <span>{group.lastMessage.messageTime ? group.lastMessage.messageTime : '--'}</span>
                            <span>{group.lastMessage.message ? group.lastMessage.message : '--'}</span>
                        </div>
                    }
                    )
                }
                {/*  <div className={classes.group}>
                        <span>Group name</span>
                        <span>00:00</span>
                        <span>Last text</span>
                </div> */}

                {/*new group component */}
                {displayNewGroup ? <NewGroup cancel={() => setdisplayNewGroup(false)} submit={addGroupHandler} input={inputHandler} /> : null}
            </div>
        </div>

    )
}

export default GroupsList;