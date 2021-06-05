import './App.css';
// import firebase from "firebase/app";
// import "firebase/auth";
import SignIn from './containers/signIn/signIn';
// import Home from './containers/home/home';
import {firebaseInit} from './firebase';

function App() {
  firebaseInit();
  return (
    <div className="App">
      <SignIn />
    </div>
  );
}

export default App;
