import React from 'react';
import './App.css';
import Credentials from './components/Credentials'
import HomepageContainer from './components/HomepageContainer'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends React.Component {

state = {
  loggedIn: false,
}

// handleAuthenticate = (e, userInfo) => {
//   e.preventDefault()
//   fetch('http://localhost:3000/api/v1/users',{
//     method: "POST",
//     headers: {
//       'content-type': 'application/json'
//     },
//     body: JSON.stringify(userInfo)
//   })
//   .then(this.setState({loggedIn: true}))
// }


render(){
  return(
    <Router>  
        <Route path='/login' render={() => <Credentials handleAuthenticate={this.handleAuthenticate}/>} />
        <Route path='/main' render={() => <HomepageContainer/>} />
    </Router>
  );
}


}
export default App;
