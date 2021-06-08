import React from 'react';
import classes from './signIn.module.css';
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig } from '../../firebase';
const signIn = () => {
    return (
        <div className={classes.signIn}>
            <h1>Welcome to my chat app</h1>
            <p>Join and chat away with the rest of the world</p>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )
}
export default signIn;