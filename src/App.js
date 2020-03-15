import React from 'react';
import './App.css';
import Credentials from './components/Credentials'
import HomepageContainer from './components/HomepageContainer'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      
        <Route path='/login' component={Credentials} />
        <Route path='/main' render={() => <HomepageContainer/>} />
      
    </Router>
  );
}

export default App;
