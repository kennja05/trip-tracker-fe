import React from 'react'
import PastTrips from './PastTrips'
import PopularDestinationsContainer from './PopularDestinationsContainer'
import TripContainer from './TripContainer'
import AddTripForm from './forms/AddTripForm'
import NavBar from './NavBar'


class HomepageContainer extends React.Component {
   
    
    
    
    render(){
    return(
        <div>
            <NavBar user={this.props.user} logout={this.props.logout} history={this.props.history}/>
        <div className='Homepage'>
            <PopularDestinationsContainer />
            <TripContainer user={this.props.user} history={this.props.history} match={this.props.match}/>
            <AddTripForm user={this.props.user} history={this.props.history} match={this.props.match}/>
            <PastTrips user={this.props.user} history={this.props.history} match={this.props.match}/>
        </div>
        </div>

        )
    }
    }



export default HomepageContainer