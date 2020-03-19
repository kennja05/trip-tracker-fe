import React from 'react'
import CurrencyContainer from './CurrencyContainer'
import PopularDestinationsContainer from './PopularDestinationsContainer'
import TripContainer from './TripContainer'
import AddTripForm from './forms/AddTripForm'



const HomepageContainer = (props) => {

    
    return(
        <div className='Homepage'>
            <CurrencyContainer user={props.user}/>
            <PopularDestinationsContainer />
            <TripContainer user={props.user} history={props.history} match={props.match}/>
            <AddTripForm user={props.user} history={props.history} match={props.match}/>
        </div>

        )
    }



export default HomepageContainer