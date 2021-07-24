import React from 'react';
import classes from './newGroup.module.css';

const newGroup = (props) => {
    return (
        <div className={classes.mainContainer}>
            <form onSubmit={props.submit}>
                <div className={classes.Input}>
                    <label>Group Name:</label>
                    <input type="text" maxLength = "20" onChange={props.input}/>
                </div>
                <div className={classes.btnsContainer}>
                    <button onClick={props.cancel}>Cancel</button>
                    <input type="submit" value="Create group" />
                </div>
            </form>
            {/*   <div className={classes.input}>
                <span>Group Name:</span>
            </div>
            <div className={classes.btnsContainer}>
                <button onClick={props.newGroup}>Create group</button>
            </div> */}
        </div>
    )
}

export default newGroup;