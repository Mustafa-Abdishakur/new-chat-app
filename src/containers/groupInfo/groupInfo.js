import React, {useState, useEffect} from 'react';
import classes from './groupInfo.module.css';
import settings from '../../img/options.png';
import testImg from '../../img/blank-profile.png';

const GroupInfo = (props) => {
    // group name - members - add new member if admin - exit group (delete too if admin)
    const [displaySettings, setDisplaySettings] = useState(false);
    // const [update, setUpdate] = useState(0);

    const settingsHandler = () => {
        if (displaySettings) {
            setDisplaySettings(false);
        } else {
            setDisplaySettings(true);
        }
    }
    //turn members prop into an iterable array
    const membersArr = [];
    for (const member in props.members) {
        membersArr.push(props.members[member])
    }
    console.log(membersArr)
/*     useEffect(() => {
        setTimeout(() => {
            setUpdate(update + 1)
            console.log('updatew')
        },4000)
    },[]) */
    return (
        <div className={classes.mainContainer}>
            <div className={classes.block}></div>
            <div className={classes.groupInfo}>
                <div className={classes.GroupNameContainer}>
                    <span>{props.groupName}</span>
                    <div className={classes.dropdown} onClick={settingsHandler}>
                        <img src={settings} alt='' />
                        <div className={displaySettings ? [classes.dropdownContent, classes.viewSettings].join(' ') : classes.dropdownContent}>
                            <p>Add member</p>
                            <p>Exit group</p>
                        </div>
                    </div>
                </div>
                <div className={classes.membersContainer}>
                    <p><i>Members</i></p>
                      { 
                           membersArr.map(member => {
                               return (
                                <div className={classes.member}>
                                <img src={member.image} alt='' />
                                <span>{member.name}</span>
                            </div>
                               )
                          
                           })
                       }
                        
                   {/*  <div className={classes.member}>
                        <img src={testImg} alt='' />
                        <span>Member name</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
};

export default GroupInfo;