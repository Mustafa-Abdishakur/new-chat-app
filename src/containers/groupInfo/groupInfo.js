import React, { useState, useEffect } from 'react';
import classes from './groupInfo.module.css';
import settings from '../../img/options.png';
import NewMember from '../../components/newMember/newMember';
import close from '../../img/close.png';
import firebase from "firebase/app";
import 'firebase/database';
import ExitGroup from '../../components/exitGroup/exitGroup';
const GroupInfo = (props) => {
    const [displaySettings, setDisplaySettings] = useState(false);
    const [displaySearch, setDisplaySearch] = useState(false);
    const [displayRemove, setDisplayRemove] = useState(false);
    const [displayExitGroup, setDisplayExitGroup] = useState(true);

    let adminStatus;
    if (props.members === undefined) {
        adminStatus = false;
    } else {
        if(props.members[props.userId] === undefined) {
            adminStatus = false;
        }else {
            adminStatus = props.members[props.userId].hasOwnProperty('admin') && props.members[props.userId].admin === true;
        }
    }
    const settingsHandler = () => {
        if (displaySettings) {
            setDisplaySettings(false);
        } else {
            setDisplaySettings(true);
        }
    }
    useEffect(() => {
        setDisplaySettings(false);
        setDisplaySearch(false);
        setDisplayRemove(false);
        setDisplayExitGroup(false);
    }, [props.groupId])

    const searchHandler = () => {
        setDisplayRemove(false);
        if (adminStatus) {
            if (props.groupId !== 'generalChat') {
                setDisplaySearch(true);
            } else {
                alert('This group already includes everyone')
            }
        } else {
            alert('Sorry, this feature is only for the group admin')
        }

    }

    const closeSearchHandler = () => {
        setDisplaySearch(false);
    }

    //turn members prop into an iterable array
    const membersArr = [];
    for (const member in props.members) {
        membersArr.push(props.members[member])
    }

    const displayRemoveMember = () => {
        if (adminStatus) {
            setDisplaySearch(false);
            setDisplayRemove(!displayRemove);
        } else {
            alert('Sorry, this feature is only for the group admin')
        }

    }
    const displayExitHandler = (value) => {
        if (props.groupId !== 'generalChat') {
            setDisplayRemove(false);
            setDisplayExitGroup(value);
        } else {
            alert('Sorry, this feature is only for the group admin')
        }
    }
    //remove member to the current group
    const removeMemberHandler = (userId, groupId) => {
        firebase.database().ref('group messages/' + groupId + '/members/' + userId).remove();
        firebase.database().ref('users/' + userId + '/groups/' + groupId).remove();

    }
    //exit group 
    const exitGroupHandler = () => {
        firebase.database().ref('users/' + props.userId + '/groups/' + props.groupId).remove();
        firebase.database().ref('group messages/' + props.groupId + '/members/' + props.userId).remove();
        if (adminStatus) {
            firebase.database().ref('group messages/' + props.groupId).remove();
        }
        setDisplayExitGroup(false);
        props.reset();
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.block}></div>
            <div className={classes.groupInfo}>
                <div className={classes.GroupNameContainer}>
                    <span>{props.groupName}</span>
                    <div className={classes.dropdown} onClick={settingsHandler}>
                        <img src={settings} alt='' />
                        <div className={displaySettings ? [classes.dropdownContent, classes.viewSettings].join(' ') : classes.dropdownContent}>
                            <p onClick={searchHandler}>Add member</p>
                            <p onClick={displayRemoveMember}>Remove member</p>
                            <p onClick={() => displayExitHandler(true)}>Exit group</p>
                        </div>
                    </div>
                </div>
                <div className={classes.membersContainer}>
                    <p><i>Members</i></p>
                    {
                        membersArr.length === 0 ? <p className={classes.text}><i>This group includes everyone</i></p> : null
                    }
                    <div className={classes.listOfMembers}>
                        {
                            membersArr.map(member => {
                                return (
                                    <div className={classes.member} key={member.id}>
                                        <img src={member.image} alt='' />
                                        <span>{member.name}</span>
                                        {!member.admin && displayRemove ? <img src={close} className={classes.close} alt='' onClick={() => removeMemberHandler(member.id, props.groupId)} /> : null}
                                        {member.admin ? <span className={classes.adminText}><i>Admin</i></span> : null}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {displaySearch ? <NewMember closeSearch={closeSearchHandler} listOfUsers={props.listOfUsers} addToGroup={props.addToGroup} groupId={props.groupId} /> : null}
                {displayExitGroup ? <ExitGroup cancel={() => displayExitHandler(false)} remove={exitGroupHandler} adminStatus={adminStatus} /> : null}
            </div>
        </div>
    )
};

export default GroupInfo;