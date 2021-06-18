import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database';

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
/*let  database; */

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

  // Get a reference to the database service
  // database = firebase.database();

  //check if user is signed in or not
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      localStorage.setItem('name', user.displayName);
      localStorage.setItem('email', user.email);
      localStorage.setItem('profileImg', user.photoURL);
      localStorage.setItem('uid', user.uid);
      //redirect to chat page
      if (window.location.pathname === '/') {
        window.location = '/chatPage';
      };
    } else {
      // No user is signed in so redirect to home page
      if (window.location.pathname === '/chatPage') {
        window.location = '/';
        localStorage.clear();
      };
    }
  });
  // console.log(currentUser)
}

export { FirebaseInit, uiConfig, /* currentUser */ };