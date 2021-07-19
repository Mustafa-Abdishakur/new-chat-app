import React, {useState, useEffect} from 'react';
import classes from './groupInfo.module.css';
import settings from '../../img/options.png';
import testImg from '../../img/blank-profile.png';
import NewMember from '../../components/newMember/newMember';

const GroupInfo = (props) => {
    // group name - members - add new member if admin - exit group (delete too if admin)
    const [displaySettings, setDisplaySettings] = useState(false);
    const [displaySearch, setDisplaySearch] = useState(false);
    const settingsHandler = () => {
        if (displaySettings) {
            setDisplaySettings(false);
        } else {
            setDisplaySettings(true);
        }
    }
    const searchHandler = () => {
        setDisplaySearch(true);
    }
    const closeSearchHandler = () => {
        setDisplaySearch(false);
    }
    //display members' search list or not
  
    //turn members prop into an iterable array
    const membersArr = [];
    for (const member in props.members) {
        membersArr.push(props.members[member])
    }
    // console.log(membersArr)
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
                            <p>Exit group</p>
                        </div>
                    </div>
                </div>
                <div className={classes.membersContainer}>
                    <p><i>Members</i></p>
                    {
                       membersArr.length === 0 ? <p className={classes.text}><i>This group includes everyone</i></p> : null                          
                    }
                      { 
                           membersArr.map(member => {
                                return (
                                    <div className={classes.member}>
                                    <img src={member.image} alt='' />
                                    <span>{member.name}</span>
                                    {member.admin ? <span className={classes.adminText}><i>Admin</i></span>:null}
                                </div>
                                   )
                               })
                       }
                        
                   {/*  <div className={classes.member}>
                        <img src={testImg} alt='' />
                        <span>Member name</span>
                    </div> */}
                </div>
                {displaySearch ? <NewMember closeSearch={closeSearchHandler} /> : null }
            </div>
        </div>
    )
};

export default GroupInfo;