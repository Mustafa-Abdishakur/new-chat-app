import './App.css';
import SignIn from './containers/signIn/signIn';
import chatPage from './containers/chatPage/chatPage';
import { FirebaseInit } from './firebase';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  FirebaseInit();
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/chatPage' component={chatPage} />
        <Route exact path='/' component={SignIn} />
        <span className="reference">Built by <a href="https://www.mustafaabdishakur.com" target="_blank" rel="noreferrer">Mustafa Abdishakur</a></span>
      </div>
    </BrowserRouter>

  );
}

export default App;
