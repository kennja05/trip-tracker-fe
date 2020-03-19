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

handleLogOut = () => {
  this.setState({
    loggedIn: false,
    user: null
  })
}


render(){
  console.log(this.state.user)
  return(
    <div className='app'>
      <Switch>
        <Route exact path='/' render={(routerProps) => <Credentials {...routerProps} handleSignup={this.handleSignup} handleLogin={this.handleLogin}/>} />
        <Route path='/dashboard' render={(routerProps) => <HomepageContainer user={this.state.user} {...routerProps}/>} />
        <Route path='/alldestinations' render={() => <AllDestinations user={this.state.user}/>} />
        <Route path='/trip/:id' render={(routerProps) => <TripShow user={this.state.user} {...routerProps}/>} />
      </Switch>
    </div>
    
  );
}


}
export default App;
