
import React from 'react';
import LandingPage from './components/LandingPage';
import VideoPage from './components/VideoPage';
import {BrowserRouter as Router,Route} from "react-router-dom";
import './App.css';

function App() {


  return (
   
    <div className="App" id='root'>
        <Router>
          <Route path='/' component={LandingPage} exact />
          <Route path='/videos/:id' component={VideoPage} />
        </Router>
    </div>
  );
}

export default App;




