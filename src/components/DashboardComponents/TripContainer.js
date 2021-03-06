import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowCircleLeft, faArrowCircleRight, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'


import PleaseLogin from '../Misc/PleaseLogin'
import Delete from './Delete'

export default class TripContainer extends React.Component {

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
        if (prevProps.user !== this.props.user){
            this.fetchUserTrips()
        }
    }

    fetchUserTrips = () => {
        fetch(`https://trip-tracker-backend.herokuapp.com/api/v1/users/${this.props.user.id}/trips`)
            .then(res => res.json())
            .then(userTrips => this.setState({
                myTrips: userTrips.filter(trip => trip.end_date >= new Date().toISOString().slice(0,10)),
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
        } else {
            this.setState({
                startIndex: 0
            })
        }
    }

    handleTripClick = (trip) => {
        this.props.history.push(`/trip/${trip.id}`)
    }

    deleteTrip = (tripId) => {
        fetch(`https://trip-tracker-backend.herokuapp.com/api/v1/trips/${tripId}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(deletedTrip => this.setState({
            myTrips: this.state.myTrips.filter(trip => trip.id !== deletedTrip.id)
        }))
    }



    render(){
        const {loaded, myTrips, startIndex} = this.state
        return (
            loaded ? 
            <div id='upcoming-trips' className='dashboard-container'>
                <div className='sub-dash-container-div'>
                    <h2 style={{fontFamily: 'Racing Sans One'}}><u>My Trips</u> 
                    <span style={{marginLeft: '5px'}}data-tip="Trips that are either ongoing or coming up. Click the destination name to see
                        more information about the trip. Double click the calender icon next to 
                        the trip to permantly remove the trip from your history">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <ReactTooltip type='dark' place='top' />
                        </span></h2>
                    {myTrips.length === 0 && <p>There are no upcoming trips</p>} 
                    <ul className='list'>
                        {myTrips.slice(startIndex, startIndex + 4).map(trip => 
                        <li className='trip' 
                        key={trip.id}><b className='trip-name' onClick={() => this.handleTripClick(trip)} >{trip.destination.name}</b>
                            <span onDoubleClick={() => this.deleteTrip(trip.id)}><Delete /></span>
                            <ul>
                                <li>Dates: <u>{trip.start_date}</u> - <u>{trip.end_date}</u></li>
                                <li className={this.props.rates[1].rate_list.rates[trip.destination.code] 
                                    >= this.props.rates[0].rate_list.rates[trip.destination.code] 
                                    ? 'green' : 'red'}>
                                    Exchange Rate: ${this.props.rates[1].rate_list.rates[trip.destination.code]}
                                     : 1 {trip.destination.currency_name}(s)
                                </li>
                            </ul>
                        </li>)}
                    </ul>         
                    <span className='arrow' onClick={this.handlePrevClick}>
                        <FontAwesomeIcon title='arrow-left' icon={faArrowCircleLeft} />
                    </span>
                    <span className='arrow' onClick={this.handleNextClick}>
                        <FontAwesomeIcon title='arrow-left' icon={faArrowCircleRight} />
                    </span>
                </div>
            </div>   
            :
            <PleaseLogin location='present' />
        )
    }
}