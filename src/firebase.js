import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeNMxcJMDLX9MqsYJNx_uTe6awE0kO7gw",
  authDomain: "chat-application-65ba3.firebaseapp.com",
  projectId: "chat-application-65ba3",
  storageBucket: "chat-application-65ba3.appspot.com",
  messagingSenderId: "399186218605",
  appId: "1:399186218605:web:1c0427d835d007467eb964"
};
var firebaseui = require('firebaseui');
let ui;
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
  signInSuccessUrl: 'chat',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '',
  // Privacy policy url.
  privacyPolicyUrl: ''
};
const firebaseInit = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    ui = new firebaseui.auth.AuthUI(firebase.auth());

  } else {
    firebase.app();
    ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  }
  ui.start('#firebaseui-auth-container', uiConfig);

}
export { firebaseInit, ui, uiConfig};