import classes from './newMember.module.css';
import React, { useState } from 'react';
import closeImg from '../../img/close.png';

const NewMember = (props) => {
    const [displayList, setDisplayList] = useState(false);
    const [listOfUsers, setListOfUsers] = useState(props.listOfUsers);

    const displayListHandler = (value) => {
        setDisplayList(value);

    }
    const searchHandler = (event) => {
        const value = event.target.value;
        const filteredUsers = props.listOfUsers.filter(user => user.name.toLowerCase().includes(value));
        if(filteredUsers.length === 0) {
        setListOfUsers([]);
        }else {
            setListOfUsers(filteredUsers);
        }
        if(value === '') {
        setListOfUsers(props.listOfUsers);
        }
    }
    // console.log(listOfUsers)
    return (
        <div className={classes.mainContainer}>
            <div className={classes.searchContainer}>
                <input type="text" placeholder="search for member" onFocus={() => displayListHandler(true)} onBlur={() => displayListHandler(false)} onChange={searchHandler} />
                <img className={classes.closeImg} src={closeImg} onClick={props.closeSearch} alt='' />
            </div>
            {displayList ?
                <div className={classes.membersList} >
                    {
                        listOfUsers.map(user => {
                            return (
                                <div className={classes.member} key={user.id} onMouseDown={() => props.addToGroup(props.groupId, user)} >
                                    <img src={user.image} alt='' />
                                    <span>{user.name}</span>
                                </div>
                            )
                        })
                    }
                    {/*   <div className={classes.member}>
                        <img src={testImg} alt='' />
                        <span>Name</span>
                    </div> */}
                </div>
                : null}

        </div>
    )
}
export default NewMember;