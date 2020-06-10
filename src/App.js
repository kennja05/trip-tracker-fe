import React from 'react';
import './App.css';
import Credentials from './components/Credentials'
import AllDestinations from './components/AllDestinations'
import HomepageContainer from './components/HomepageContainer'
import { Route, Switch} from 'react-router-dom'
import TripShow from './components/TripShow'
import Navbar from './components/NavBar'
import NoContent from './components/NoContent'

class App extends React.Component {

    state = {
        loggedIn: false,
        user: null, 
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

    render(){
        return(
          <div className='app'>
            <Navbar logout={this.handleLogout} user={this.state.user} />
            <div className='route-components'>
              <Switch>
                <Route exact path='/' render={(routerProps) => <Credentials {...routerProps} handleLogin={this.handleLogin}/>} />
                <Route path='/dashboard' render={(routerProps) => <HomepageContainer logout={this.handleLogOut} user={this.state.user} {...routerProps}/>} />
                <Route path='/alldestinations' render={(routerProps) => <AllDestinations logout={this.handleLogout} {...routerProps} user={this.state.user}/>} />
                <Route path='/trip/:id' render={(routerProps) => <TripShow logout={this.handleLogOut} user={this.state.user} {...routerProps}/>} />
                <Route path='*' component={NoContent} />
              </Switch>
            </div>
          </div>
        );
    }
}
export default App;
