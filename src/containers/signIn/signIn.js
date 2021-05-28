import React from 'react';
import classes from './signIn.module.css';

const signIn = () => {
    return (
        <div className={classes.signIn}>
            <h1>Welcome to my chat app</h1>
            <p>Join and chat away with the rest of the world</p>
            <div className="btns-container">
                <button>
                    Sign in with google
                </button>
            </div>
        </div>
    )
}

export default signIn;