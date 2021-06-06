import React from 'react';
import classes from './signIn.module.css';
import firebase from "firebase/app";
import "firebase/auth";
// import { ui } from '../../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig } from '../../firebase';
const signIn = () => {
    return (
        <div className={classes.signIn}>
            <h1>Welcome to my chat app</h1>
            <p>Join and chat away with the rest of the world</p>
           {/*  <div className="btns-container">
                <button onClick={redirect}>
                    Sign in with google
                </button>
            </div> */}
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )
}
const redirect = () => {
    /* 
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: './home/home',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
        };
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig); */
}
export default signIn;