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
const firebaseInit = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    ui = new firebaseui.auth.AuthUI(firebase.auth());

  } else {
    firebase.app();
    ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  }
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      // List of OAuth providers supported.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // Other config options...
  });

}
export {firebaseInit, ui};