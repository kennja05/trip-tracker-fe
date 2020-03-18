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
                loaded: true,
                plannedExpenses: trp.planned_expenses
            }))
    }

    handleAddPlannedExpense = (e, plannedExp) => {
        e.preventDefault()
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
        .then(pe => this.setState({
            plannedExpenses: [...this.state.plannedExpenses, pe]
        }))
    }


    sumPlannedExpenses = () => {
        if (this.state.loaded) {
        const costsArray = this.state.plannedExpenses.map(pe => pe.cost)
        const sum = costsArray.reduce(function(a,b){
            return a + b
        }, 0)
        return sum}
    }

    render(){
        console.log(this.state.plannedExpenses)
        return(
            this.state.loaded ? 
            <div className='trip-show'>
                
                <h1>Your Trip to: {this.state.loaded && this.state.trip.destination.name} </h1>
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
                <h2>Current Planned Expenses: </h2>
                <ul>
                {this.state.trip.planned_expenses.map(pe => <li key={pe.id}>{pe.name} - {pe.cost} {this.state.trip.destination.code} - {pe.date}</li>)}
                <li><b>Current Total: {this.sumPlannedExpenses()} {this.state.trip.destination.code}</b></li>
                </ul>
                <h2>Current Cost of Planned Expenses in Dollars: [perform conversion based on todays rate]</h2>
                <h2>Cost of Planned Expenses at time of Trip Pannning: [perform historical conversion]</h2>
                <PlannedExpenseForm handleSubmit={this.handleAddPlannedExpense} trip={this.state.trip}/>

                <Link to='/dashboard'>Return to Dashboard</Link>

            </div> : 
            <ReactLoading type={'spin'} color={'000'} />
        )
    }



}