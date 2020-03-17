import React from 'react';
import './App.css';
import Credentials from './components/Credentials'
import HomepageContainer from './components/HomepageContainer'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

class App extends React.Component {

state = {
  loggedIn: false,
  user: null
}

handleLogin = (inputUser) => {
  // e.preventDefault()
  this.setState({
    loggedIn: true,
    user: inputUser
  })
}

handleSignup = (newUserObject) => {
  if (!newUserObject.errors) {
    this.setState({
      loggedIn: true,
      user: newUserObject
    })
  } else {
    alert(newUserObject.errors)
  }
}


render(){
  return(
    <Router>  
        <Route path='/login' render={() => <Credentials handleSignup={this.handleSignup} handleLogin={this.handleLogin}/>} />
        <Route path='/main' render={() => <HomepageContainer user={this.state.user} />} />
    </Router>
  );
}


}
export default App;
