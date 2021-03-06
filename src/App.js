import React from 'react';
import './App.css';
import './Dashboard.css'
import './TripShow.css'
import { Route, Switch } from 'react-router-dom'

import Credentials from './components/Containers/Credentials'
import AllDestinations from './components/Misc/AllDestinations'
import HomepageContainer from './components/Containers/HomepageContainer'
import TripShow from './components/Containers/TripShow'
import Navbar from './components/Misc/NavBar'
import NoContent from './components/Misc/NoContent'
import EditProfile from './components/Edit/EditProfile'

class App extends React.Component {

  state = {
    loggedIn: false,
    user: null,
    rates: {}
  }

  componentDidMount(){
    fetch('https://trip-tracker-backend.herokuapp.com/api/v1/newRates')
      .then(res => res.json())
      .then(newRates => this.setState({
        rates: newRates
      }))
  }

  handleLogin = (inputUser) => {
    this.setState({
      loggedIn: true,
      user: inputUser
    })
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      user: null
    })
  }

  render() {
    return (
      <div className='app'>
        <Navbar logout={this.handleLogout} user={this.state.user} />
        <div className='route-components'>
          <Switch>
            <Route exact path='/' render={(routerProps) => <Credentials {...routerProps} handleLogin={this.handleLogin} />} />
            <Route path='/dashboard' render={(routerProps) => <HomepageContainer rates={this.state.rates} logout={this.handleLogOut} user={this.state.user} {...routerProps} />} />
            <Route path='/alldestinations' render={(routerProps) => <AllDestinations rates={this.state.rates} />} />
            <Route path='/trip/:id' render={(routerProps) => <TripShow logout={this.handleLogOut} user={this.state.user} {...routerProps} />} />
            <Route path='/user/:id' render={(routerProps) => <EditProfile user={this.state.user} {...routerProps}/>} />
            <Route path='*' component={NoContent} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
