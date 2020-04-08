import React from 'react'
import { Link } from 'react-router-dom'

export default class PastTrips extends React.Component {

    state = {
        myTrips: [], 
        loaded: false,
        startIndex: 0,
        currentDate: null
    }

    componentDidMount(){
        if (this.props.user) {
            this.fetchUserTrips()
        }
    } 

    componentDidUpdate(prevProps, prevState){
        if (this.props.user !== prevProps.user) {
            this.fetchUserTrips()
        }
    }
    
    fetchUserTrips = () => {
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/trips`)
            .then(res => res.json())
            .then(userTrips => this.setState({
                myTrips: userTrips.filter(trip => trip.end_date < new Date().toISOString().slice(0,10)),
                currentDate: new Date().toISOString().slice(0,10),
                loaded: true
            }))
    }

    handleNextClick = () => {
        if (this.state.startIndex + 3 < this.state.myTrips.length) {
            this.setState({
                startIndex: this.state.startIndex + 3
            })
        } 
    }

    handlePrevClick = () => {
        if (this.state.startIndex >=3) {
            this.setState({
                startIndex: this.state.startIndex - 3
            })
        } else if (this.state.startIndex < 3 || this.state.startIndex !== 0 ) {
            this.setState({
                startIndex: 0
            })
        }
    }

    handleTripClick = (trip) => {
        this.props.history.push(`/trip/${trip.id}`)
    }

    deleteTrip = (tripId) => {
        const decision = prompt("You are about to remove this trip. Press 'y' to continue")
        if (decision === 'y' || decision === "Y" || decision === "yes"){
        fetch(`http://localhost:3000/api/v1/trips/${tripId}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(deletedTrip => this.setState({
            myTrips: this.state.myTrips.filter(trip => trip.id !== deletedTrip.id)
        }))
    }
    }


    render(){
        return (
            this.state.loaded ? 
            <div className='Dashboard-Container'>
                <div className='sub-dash-container-div'>
                    <h2><u>Past Trips</u></h2>
                    {this.state.myTrips.length === 0 && <p>No Trips Have Have Been Completed</p>} 
                    <ul className='list'>
                        {this.state.myTrips.slice(this.state.startIndex, this.state.startIndex + 3).map(trip => 
                            <li onClick={() => this.handleTripClick(trip)} className='trip' key={trip.id}><b>{trip.destination.name}</b> - <span className='delete-past-trip' onClick={() => this.deleteTrip(trip.id)}>×</span>
                            <ul>
                                <li>Dates: <u>{trip.start_date}</u> - <u>{trip.end_date}</u></li>
                                <li style={{color: `${trip.values[trip.values.length - 1].rate > trip.values[trip.values.length - 2].rate ? 'green' : 'red'}`}}>Exchange Rate: {trip.values[trip.values.length - 1].rate} {trip.destination.currency_name}(s): $1</li>
                            </ul>
                        </li>)}
                    </ul>
                    <button onClick={this.handlePrevClick}>
                        <i className='arrow left'></i>
                    </button>
                    <button onClick={this.handleNextClick}>
                        <i className='arrow right'></i>
                    </button>
                </div>
            </div>
            : 
            <div className='Dashboard-Container'>
                <div className='sub-dash-container-div'>
                    <h2><u>Past Trips</u></h2>
                    <Link className='link' to='/'><b>Log In to See Your PastTrips</b></Link>
                </div>
            </div>
        )
    }


}