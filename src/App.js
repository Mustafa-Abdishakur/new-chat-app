import './App.css';
import SignIn from './containers/signIn/signIn';
import chatPage from './containers/chatPage/chatPage';
import { firebaseInit } from './firebase';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  firebaseInit();
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/chatPage' component={chatPage} />
        <Route exact path='/' component={SignIn} />
      </div>
    </BrowserRouter>

  );
}

export default App;
