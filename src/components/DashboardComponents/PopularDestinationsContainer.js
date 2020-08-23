import React from 'react'
import ReactLoading from 'react-loading' 
import { Link } from 'react-router-dom'

class PopularDestinationsContainer extends React.Component {

    state = {
        topDestinations: [],
        loaded: false
    }

    componentDidMount(){
        fetch('https://trip-tracker-backend.herokuapp.com/api/v1/destinations/top')
            .then(res => res.json())
            .then(tDestinations => this.setState({
                topDestinations: tDestinations, 
                loaded: true
            }))
    }
 
    render(){
        const {loaded, topDestinations} = this.state
        return(
            <div id='popular-destinations' className='dashboard-container'>
                <div className='sub-dash-container-div'>
                    <h2 style={{fontFamily: 'Racing Sans One'}}><u>Top Destinations by Entire Site</u></h2>
                    {loaded ? null : <ReactLoading type={'spin'} color={'#6b6e70'}/>}
                    <ol>
                        {topDestinations.map(dest => 
                            <li key={dest.id}>
                                {dest.name} - {dest.trips.length} Trips
                            </li>)}  
                    </ol>
                    <Link className='link' to='/alldestinations'>See All</Link>
                </div>
            </div>
        )
    }
}

export default PopularDestinationsContainer