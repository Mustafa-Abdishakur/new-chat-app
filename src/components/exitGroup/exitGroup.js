import  classes from './exitGroup.module.css';
import React from 'react';

const exitGroup = (props) => {

    return (
        <div className={classes.mainContainer}>
            <p>
                Are you sure you want to exit the group? 
            </p>
            {props.adminStatus ? <span>Note: As the admin, the group will also be deleted</span>:null}
            <div className ={classes.btns}>
            <button onClick={props.cancel}>Cancel</button>
            <button onClick={props.remove}>Yes</button>
            </div>
        </div>
    )
}

export default exitGroup;