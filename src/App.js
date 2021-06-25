import './App.css';
import SignIn from './containers/signIn/signIn';
// import chatMessages from './containers/chatMessages/chatMessages';
import { FirebaseInit } from './firebase';
import { BrowserRouter, Route } from 'react-router-dom';
import chat from './containers/chat/chat';
function App() {
  FirebaseInit();
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/chat' component={chat} />
        <Route exact path='/' component={SignIn} />
        <span className="reference">Built by <a href="https://www.mustafaabdishakur.com" target="_blank" rel="noreferrer">Mustafa Abdishakur</a></span>
      </div>
    </BrowserRouter>

  );
}

export default App;
