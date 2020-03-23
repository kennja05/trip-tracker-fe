import React from 'react'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'

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
                <h2>All Destinations - {this.state.loaded ? `${this.state.destinations.length} total` : <ReactLoading type={'spin'} color={'000'}/>} </h2>
                {this.props.user ? <Link className='link' to='/dashboard'>
                    <p>Return to Dashboard</p>
                </Link> : <Link className='link' to='/'>Log In / Sign Up</Link>}
                <ul>
                    {this.state.destinations.map(destination => <li key={destination.id}>
                        <b>{destination.name}</b> (Local Name: {destination.native_name})
                            <ul>
                                <li><u>Capital</u>: {destination.capital}</li>
                                <li><u>Trips Planned To Here By Site Users</u>: {destination.trips.length}</li>
                                <li><u>Currency Code/Symbol</u>: {destination.currency_name} / {destination.code} ({destination.symbol})</li>
                                <ul>
                                    <li>Current Exchange Rate: {destination.values.slice(-1).pop().rate} {destination.code} : $1 USD</li>
                                </ul>
                            </ul>
                    </li>)}
                </ul>
            </div>
        ) 
    }



}