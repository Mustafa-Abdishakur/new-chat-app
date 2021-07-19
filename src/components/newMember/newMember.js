import classes from './newMember.module.css';
import React, {useState} from 'react';
import closeImg from '../../img/close.png';
import testImg from '../../img/blank-profile.png';

const NewMember = (props) => {
    const [displayList, setDisplayList] = useState(false);

    const displayListHandler = (value) => {
        setDisplayList(value);
    }
    return (
        <div className={classes.mainContainer}>
            <div className={classes.searchContainer}>
                <input type="text" placeholder="search for member" onFocus={() => displayListHandler(true)} onBlur={() => displayListHandler(false)} />
                <img className={classes.closeImg} src={closeImg} onClick={props.closeSearch} alt='' />
            </div>
            {displayList ? <div className={classes.membersList}>
                <div className={classes.member}>
                    <img src={testImg} alt='' />
                    <span>Name</span>
                </div>
            </div> : null}

        </div>
    )
}
export default NewMember;