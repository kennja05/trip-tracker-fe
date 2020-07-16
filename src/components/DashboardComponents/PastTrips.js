import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowCircleLeft, faArrowCircleRight, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'

import PleaseLogin from '../Misc/PleaseLogin'
import Delete from './Delete'

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
        if (this.state.startIndex + 4 < this.state.myTrips.length) {
            this.setState({
                startIndex: this.state.startIndex + 4
            })
        } 
    }

    handlePrevClick = () => {
        if (this.state.startIndex >=4) {
            this.setState({
                startIndex: this.state.startIndex - 4
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
        fetch(`http://localhost:3000/api/v1/trips/${tripId}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(deletedTrip => this.setState({
            myTrips: this.state.myTrips.filter(trip => trip.id !== deletedTrip.id)
        }))
    }


    render(){
        return (
            this.state.loaded ? 
            <div id='past-trips' className='dashboard-container'>
                <div className='sub-dash-container-div'>
                    <h2 style={{fontFamily: 'Racing Sans One'}}><u>Past Trips</u>
                        <span style={{marginLeft: '5px'}} data-tip="Trips that have already been completed. Click the destination name to see
                        more information about the trip. Double click the calender icon next to 
                        the trip to permantly remove the trip from your history">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <ReactTooltip multiline={false} type='dark' place='top' />
                        </span>
                    </h2>
                    {this.state.myTrips.length === 0 && <p>No Trips Have Have Been Completed</p>} 
                    <ul className='list'>
                        {this.state.myTrips.slice(this.state.startIndex, this.state.startIndex + 4).map(trip => 
                            <li className='trip' key={trip.id}>
                                <b className="trip-name" onClick={() => this.handleTripClick(trip)}>{trip.destination.name} </b>
                                <span onDoubleClick={() => this.deleteTrip(trip.id)}><Delete  /></span>
                            <ul>
                                <li>Dates: <u>{trip.start_date}</u> - <u>{trip.end_date}</u></li>
                                <li className={this.props.rates[1].rate_list.rates[trip.destination.code] 
                                    >= this.props.rates[0].rate_list.rates[trip.destination.code] 
                                    ? 'green' : 'red'}>
                                    Exchange Rate: ${this.props.rates[1].rate_list.rates[trip.destination.code]}
                                     : 1 {trip.destination.currency_name}(s)
                                </li>
                            </ul>
                        </li>
                        )}
                    </ul>
                    <span className='arrow' onClick={this.handlePrevClick}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} />
                    </span>
                    <span className='arrow' onClick={this.handleNextClick}>
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                    </span>
                </div>
            </div>
            : 
            <PleaseLogin location='past' />
        )
    }
}