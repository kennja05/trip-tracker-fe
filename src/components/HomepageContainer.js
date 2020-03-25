import React from 'react'
import PastTrips from './PastTrips'
import PopularDestinationsContainer from './PopularDestinationsContainer'
import TripContainer from './TripContainer'
import AddTripForm from './forms/AddTripForm'
import NavBar from './NavBar'


const HomepageContainer = (props) => {

    return(
        <div>
            <NavBar user={props.user} logout={props.logout} history={props.history}/>
        <div className='Homepage'>
            <PopularDestinationsContainer />
            <TripContainer user={props.user} history={props.history} match={props.match}/>
            <AddTripForm user={props.user} history={props.history} match={props.match}/>
            <PastTrips user={props.user} history={props.history} match={props.match}/>
        </div>
        </div>

        )
    }



export default HomepageContainer