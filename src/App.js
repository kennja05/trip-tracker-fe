import React from 'react';
import './App.css';
import Credentials from './components/Credentials'
import HomepageContainer from './components/HomepageContainer'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends React.Component {

state = {
  loggedIn: false,
  userId: ''
}

handleLogin = (e) => {
  e.preventDefalt()
  this.setState({loggedIn: true})
  console.log(this.state.loggedIn)
}


render(){
  return(
    <Router>  
        <Route path='/login' render={() => <Credentials handleLogin={this.handleLogin}/>} />
        <Route path='/main' render={() => <HomepageContainer/>} />
    </Router>
  );
}


}
export default App;
