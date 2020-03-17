import React from 'react'
import ReactLoading from 'react-loading'

export default class AllDestinations extends React.Component {

    state = {
        destinations: [],
        loaded: false
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/destinations/top/all')
            .then(resp => resp.json())
            .then(destArray => this.setState({
                destinations: destArray,
                loaded:true
            }))
    }

    render(){
        return( 
            <div>
                <h2>All Destinations</h2>
                <ul>
                    {this.state.destinations.map(destination => <li key={destination.id}>
                        <b>{destination.name}</b> (Native Name: {destination.native_name})
                            <ul>
                                <li>Capital: {destination.capital}</li>
                                <li>Currency: {destination.currency_name} ({destination.symbol})</li>
                                <li>Visits: {destination.trips.length}</li>
                            </ul>
                    </li>)}
                </ul>
            </div>
        ) 
    }



}