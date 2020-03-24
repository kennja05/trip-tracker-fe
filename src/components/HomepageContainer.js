import React from 'react'
import CurrencyContainer from './CurrencyContainer'
import PopularDestinationsContainer from './PopularDestinationsContainer'
import TripContainer from './TripContainer'
import AddTripForm from './forms/AddTripForm'
import NavBar from './NavBar'


const HomepageContainer = (props) => {

    return(
        <div>
            <NavBar />
        <div className='Homepage'>
            <PopularDestinationsContainer />
            <CurrencyContainer user={props.user}/>
            <AddTripForm user={props.user} history={props.history} match={props.match}/>
            <TripContainer user={props.user} history={props.history} match={props.match}/>
        </div>
        </div>

        )
    }



export default HomepageContainer