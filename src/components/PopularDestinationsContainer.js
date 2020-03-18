import React from 'react'
import ReactLoading from 'react-loading' 
import { Link } from 'react-router-dom'

class PopularDestinationsContainer extends React.Component {

    state = {
        topDestinations: [],
        loaded: false
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/destinations/top')
            .then(res => res.json())
            .then(tDestinations => this.setState({
                topDestinations: tDestinations, 
                loaded: true
            }))
    }

    // getPercentChangeOfEr = (destination) => {
    //     const diff = 100 * Math.abs(((destination.values.slice(-2).pop().rate) - (destination.values.slice(-1).pop().rate))/ ((destination.values.slice(-2).pop().rate) + (destination.values.slice(-1).pop().rate))/2)
    //     // console.log(diff)
    //     return diff   //currently returns 0? 
    // }


    render(){
        return(
            <div className='Sub-Container'>
                <h2>Top 10 Destinations</h2>{this.state.loaded ? null : <ReactLoading type={'spin'} color={'000'}/>}
                <ol>
                {this.state.topDestinations.map(dest => <li key={dest.id}>{dest.name} - {dest.trips.length} users have gone here</li>)}  
                </ol>
                <Link to='/alldestinations'>See All</Link>
            </div>
        )
    }


}

export default PopularDestinationsContainer