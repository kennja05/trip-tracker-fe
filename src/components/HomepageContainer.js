import React from 'react'
import CurrencyContainer from './CurrencyContainer'
import PopularDestinationsContainer from './PopularDestinationsContainer'
import TripContainer from './TripContainer'
import AddTripForm from './forms/AddTripForm'



export default class HomepageContainer extends React.Component {

    state = {
        user: { //hardcoding for now. should really be passed down as a prop from app
            id: 82,
            name: 'Jacob',
            username: 'kennja05',
            phone: '5707161763',
            email: 'jacobkenny05@gmail.com',
            image: "https://humanorigins.si.edu/sites/default/files/styles/full_width/public/images/square/neanderthalensis_JG_Recon_Head_CC_3qtr_lt_sq.jpg?itok=65pnoWxu",
            password: 123
        }
    }

    render(){
        return(
            <div className='Homepage'>
                <CurrencyContainer user={this.state.user}/>
                <PopularDestinationsContainer />
                <TripContainer user={this.state.user}/>
                <AddTripForm user={this.state.user} />
            </div>
        )
    }

}