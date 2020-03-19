import React from 'react';
import './App.css';
import Credentials from './components/Credentials'
import AllDestinations from './components/AllDestinations'
import HomepageContainer from './components/HomepageContainer'
import { Route, Switch} from 'react-router-dom'
import TripShow from './components/TripShow'

class App extends React.Component {

state = {
  loggedIn: false,
  user: null, 
  tripId: null
}

handleLogin = (inputUser) => {
  // e.preventDefault()
  this.setState({
    loggedIn: true,
    user: inputUser
  }, () => console.log(this.state))
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
    <div className='app'>
      <Switch>
        <Route path='/login' render={(routerProps) => <Credentials {...routerProps} handleSignup={this.handleSignup} handleLogin={this.handleLogin}/>} />
        <Route path='/dashboard' render={() => <HomepageContainer user={this.state.user} />} />
        <Route path='/alldestinations' render={() => <AllDestinations user={this.state.user}/>} />
        <Route path='/trip/:id' render={() => <TripShow tripId={this.state.tripId}/>} />
      </Switch>
    </div>
    
  );
}


}
export default App;
