import React from 'react'
import { Link } from 'react-router-dom'

export default class TripContainer extends React.Component {

    state = {
        myTrips: [],
        loaded: false,
        startIndex: 0
    }


    componentDidMount(){
        if (this.props.user) {
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/trips`)
            .then(res => res.json())
            .then(userTrips => this.setState({
                myTrips: userTrips,
                loaded: true
            }))
        }
    }

    handleNextClick = () => {
        if (this.state.startIndex < this.state.myTrips.length) {
            this.setState({
                startIndex: this.state.startIndex + 5
            })
        }
    }

    handlePrevClick = () => {
        if (this.state.startIndex >=5) {
            this.setState({
                startIndex: this.state.startIndex - 5
            })
        } else {
            this.setState({
                startIndex: 0
            })
        }
    }

    handleTripClick = (trip) => {
        this.props.history.push(`/trip/${trip.id}`)
    }

    render(){
        return (
            <div className='Sub-Container'>
                <h2><u>My Trips</u></h2> 
                <ul className='list'>
                    {this.state.loaded ? this.state.myTrips.slice(this.state.startIndex, this.state.startIndex + 5).map(trip => <li onClick={() => this.handleTripClick(trip)} className='trip' key={trip.id}><b>{trip.destination.name}</b>
                    <ul><li>Dates: 
                        <u>{trip.start_date}</u> - <u>{trip.end_date}</u>
                        </li>
                        <li style={{color: `${trip.values[trip.values.length - 1].rate > trip.values[trip.values.length - 2].rate ? 'red' : 'green'}`}}>Exchange Rate: {trip.values[trip.values.length - 1].rate} : $1</li>
                        </ul>
                    </li>) : <Link to='/'><b>Log In to See Your Trips</b></Link>}
                </ul>
                <button onClick={this.handlePrevClick}><span id='prev' role='img' aria-label='arrow'>⬅️</span></button><button onClick={this.handleNextClick}><span role='img' aria-label='arrow'>➡️</span></button>
            </div>
        )
    }


}