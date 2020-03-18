import React from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'
import PlannedExpenseForm from './forms/PlannedExpenseForm'


export default class TripShow extends React.Component {

    state = {
        trip: {},
        loaded: false,
        plannedExpenses: []
    }


    componentDidMount(){
        fetch('http://localhost:3000/api/v1/trips/5') //the 5 at the end should be obtained from the props - which will be the result of some sort of onclick function for the trips container
            .then(res => res.json())
            .then(trp => this.setState({
                trip: trp,
                loaded: true
            }))
    }

    handleAddPlannedExpense = (e, plannedExp) => {
        e.preventDefault()
        console.log(plannedExp)
        const peObject = {name: plannedExp.name, trip_id: this.state.trip.id, cost: plannedExp.cost, date: plannedExp.date, category: plannedExp.category}
        console.log(peObject)
        fetch('http://localhost:3000/api/v1/planned_expenses', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(peObject)
        })
        .then(res => res.json())
        .then(pe => console.log(pe))
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
                <h2>Planned Expenses: [tally up current planned expenses here]</h2>
                <h2>Current Cost of Planned Expenses in Dollars: [perform conversion based on todays rate]</h2>
                <h2>Cost of Planned Expenses at time of Trip Pannning: [perform historical conversion]</h2>
                <PlannedExpenseForm handleSubmit={this.handleAddPlannedExpense} trip={this.state.trip}/>

                <Link to='/dashboard'>Return to Dashboard</Link>

            </div> : 
            <ReactLoading type={'spin'} color={'000'} />
        )
    }



}