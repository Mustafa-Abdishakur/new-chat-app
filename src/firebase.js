import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database';
import profilePic from './img/blank-profile.png';
const firebaseConfig = {
  apiKey: "AIzaSyAeNMxcJMDLX9MqsYJNx_uTe6awE0kO7gw",
  authDomain: "chat-application-65ba3.firebaseapp.com",
  projectId: "chat-application-65ba3",
  storageBucket: "chat-application-65ba3.appspot.com",
  messagingSenderId: "399186218605",
  appId: "1:399186218605:web:1c0427d835d007467eb964",
  databaseURL: "https://chat-application-65ba3-default-rtdb.firebaseio.com/"
};
var firebaseui = require('firebaseui');
let ui;

//authetication configration
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      return true;
    },
    uiShown: function () {
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: 'chat',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  tosUrl: '',
  privacyPolicyUrl: ''
};

const FirebaseInit = () => {

  //initializing firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    ui = new firebaseui.auth.AuthUI(firebase.auth());
  } else {
    firebase.app();
    ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  }
  //initializing authentication
  ui.start('#firebaseui-auth-container', uiConfig);

  //check if user is signed in or not
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      //save message to local storage to used in chatPage.js
      localStorage.setItem('name', user.displayName === null ? 'Test' : user.displayName);
      localStorage.setItem('email', user.email);
      localStorage.setItem('profileImg', user.photoURL === null ? profilePic : user.photoURL);
      localStorage.setItem('uid', user.uid);

    /*   //redirect to chat page
      if (window.location.pathname === '/') {
        this.props.history.push('/chat');
      };
    } else {
      // No user is signed in so redirect to home page
      if (window.location.pathname === '/chat') {
        this.props.history.push('/');
        localStorage.clear();
      }; */
    }
  });
}
// const firebaseWithRouter = withRouter(FirebaseInit);

export { FirebaseInit, uiConfig };