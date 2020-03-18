import React from 'react'
import ReactLoading from 'react-loading'
import PlannedExpenseForm from './forms/PlannedExpenseForm'


export default class TripShow extends React.Component {

    state = {
        trip: {},
        loaded: false,
        plannedExpenses: []
    }


    componentDidMount(){
        fetch('http://localhost:3000/api/v1/trips/11') //the 11 at the end should be obtained from the props
            .then(res => res.json())
            .then(trp => this.setState({
                trip: trp,
                loaded: true
            }))
    }

    render(){
        return(
            this.state.loaded ? 
            <div className='trip-show'>
                
                <h1>Your Trip to {this.state.loaded && this.state.trip.destination.name} </h1>
                <img className='flag-pic' alt='flag' src={this.state.trip.destination.image} />
                <h2>Start Date: {this.state.trip.start_date}</h2>
                <h2>End Date: {this.state.trip.start_date}</h2>
                <h2>Destination Info</h2>
                <ul>
                    <li><b>Native Name: </b>{this.state.trip.destination.native_name}</li>
                    <li><b>Capital: </b> {this.state.trip.destination.capital}</li>
                    <li><b>Currency Name: </b>{this.state.trip.destination.currency_name} ({this.state.trip.destination.symbol})</li>
                    <ul><li>Official Currency Code: {this.state.trip.destination.code}</li></ul>
                </ul>
                <h2>Planned Expenses: </h2>
                <PlannedExpenseForm trip={this.state.trip}/>



            </div> : 
            <ReactLoading type={'spin'} color={'000'} />
        )
    }



}