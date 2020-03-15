import React from 'react'
import CurrencyContainer from './CurrencyContainer'
import PopularDestinationsContainer from './PopularDestinationsContainer'
import TripContainer from './TripContainer'



export default class HomepageContainer extends React.Component {


    render(){
        return(
            <div className='Homepage'>
                <CurrencyContainer />
                <PopularDestinationsContainer />
                <TripContainer />
            </div>
        )
    }

}