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
            <TripContainer user={props.user}/>
            <AddTripForm user={props.user} />
        </div>

        )
    }



export default HomepageContainer