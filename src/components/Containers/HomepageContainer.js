import React from 'react'
import PastTrips from '../DashboardComponents/PastTrips'
import PopularDestinationsContainer from '../DashboardComponents/PopularDestinationsContainer'
import TripContainer from '../DashboardComponents/TripContainer'
import AddTripForm from '../DashboardComponents/AddTripForm'


class HomepageContainer extends React.Component {
   
    render(){
        return(
        <div>
            <div className='homepage'>
                <div className='dashboard-group'>
                    <PopularDestinationsContainer />
                    <AddTripForm user={this.props.user} history={this.props.history} 
                        match={this.props.match}/>
                </div>
                <div className='dashboard-group'>
                    <TripContainer user={this.props.user} history={this.props.history} 
                        match={this.props.match}/>
                    <PastTrips user={this.props.user} history={this.props.history} 
                        match={this.props.match}/>
                </div>
            </div>
        </div>
        )
    }
}



export default HomepageContainer