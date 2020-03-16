import React from 'react';
import './App.css';
import Credentials from './components/Credentials'
import HomepageContainer from './components/HomepageContainer'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends React.Component {

state = {
  loggedIn: false,
  user: null
}

handleLogin = () => {
  // e.preventDefault()
  this.setState({loggedIn: true})
  console.log('loggin in', this.state.loggedIn)
}

handleSignup = (newUserObject) => {
  this.setState({
    loggedIn: true,
    user: newUserObject
  })

}


render(){
  return(
    <Router>  
        <Route path='/login' render={() => <Credentials handleSignup={this.handleSignup} handleLogin={this.handleLogin}/>} />
        <Route path='/main' render={() => <HomepageContainer/>} />
    </Router>
  );
}


}
export default App;
