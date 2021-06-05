import './App.css';
// import firebase from "firebase/app";
// import "firebase/auth";
import SignIn from './containers/signIn/signIn';
import Home from './containers/home/home';
import { firebaseInit } from './firebase';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  firebaseInit();
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/chat' component={Home} />
        <Route exact path='/' component={SignIn} />
      </div>
    </BrowserRouter>

  );
}

export default App;
