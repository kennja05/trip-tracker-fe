import React from 'react';
import './App.css';
import Credentials from './components/Credentials'
import AllDestinations from './components/AllDestinations'
import HomepageContainer from './components/HomepageContainer'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import TripShow from './components/TripShow'

class App extends React.Component {

state = {
  loggedIn: false,
  user: null, 
  tripId: null
}

handleLogin = (inputUser) => {
  console.log(inputUser)
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
        <Route path='/dashboard' render={() => <HomepageContainer user={this.state.user} />} />
        <Route path='/alldestinations' component={AllDestinations} />
        <Route path='/trip/:id' render={() => <TripShow tripId={this.state.tripId}/>} />
    </Router>
  );
}


}
export default App;
