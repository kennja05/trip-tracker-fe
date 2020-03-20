import React from 'react'
import { Link } from 'react-router-dom'
import PlannedExpenseForm from './forms/PlannedExpenseForm'


export default class TripShow extends React.Component {

    state = {
        trip: {},
        loaded: false,
        plannedExpenses: [],
        totalPe: null,
        beginningAmt: null
    }

    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/trips/${this.props.match.params.id}`) 
            .then(res => res.json())
            .then(trp => this.setState({
                trip: trp,
                loaded: true,
                plannedExpenses: trp.planned_expenses
            }))
    }

    // handleAddPlannedExpense = (e, plannedExp) => {
    //     e.preventDefault()
    //     const peObject = {name: plannedExp.name, trip_id: this.state.trip.id, cost: plannedExp.cost, date: plannedExp.date, category: plannedExp.category}
    //     if (peObject.cost <= 0){
    //         alert('Please input an amount greater than or equal to 0')
    //     } else {
    //     fetch('http://localhost:3000/api/v1/planned_expenses', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(peObject)
    //     })
    //     .then(res => res.json())
    //     .then(pe => this.setState({
    //         plannedExpenses: [...this.state.plannedExpenses, pe]
    //     }))}
    // }

    handleDeletePlannedExpense = (plannedExp) => {
        fetch(`http://localhost:3000/api/v1/planned_expenses/${plannedExp.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    addPe = (plannedExp) => {
        this.setState({plannedExpenses: [...this.state.plannedExpenses, plannedExp]})
        this.sumPlannedExpenses()
    }

    sumPlannedExpenses = () => {
        if (this.state.loaded) {
        const costsArray = this.state.plannedExpenses.map(pe => pe.cost)
        const sum = costsArray.reduce(function(a,b){
            return a + b
        }, 0)
        this.setState({totalPe: sum})}
    }

    render(){
        // if (this.state.trip.created_at !== undefined) {console.log(this.state.trip.values[this.state.trip.values.length-1].rate)}
        // if (this.state.trip.created_at !== undefined) {console.log(this.state.trip.created_at.slice(0,10))}
        return(
            this.state.loaded && this.props.user && this.props.user.id === this.state.trip.user_id? 
            <div className='trip-show'>
                <Link to='/dashboard'>
                    Return to Dashboard
                </Link>
                <h1>
                    Your Trip to: {this.state.loaded && this.state.trip.destination.name} 
                </h1>
                <img className='flag-pic' alt='flag' src={this.state.trip.destination.image} />
                <h2>
                    Start Date: {this.state.trip.start_date}
                </h2>
                <h2>
                    End Date: {this.state.trip.end_date}
                </h2>
                <h2>
                    Destination Info
                </h2>
                
                <ul>
                    <li><b>Native Name: </b>{this.state.trip.destination.native_name}</li>
                    <li><b>Capital: </b> {this.state.trip.destination.capital}</li>
                    <li><b>Currency Name: </b>{this.state.trip.destination.currency_name} ({this.state.trip.destination.symbol})</li>
                    <ul><li>Official Currency Code: {this.state.trip.destination.code}</li></ul>
                </ul>
                
                <h2>Current Planned Expenses: </h2>
                
                <ul>
                    <li><b>Name - Cost - Date</b></li>
                    {this.state.trip.planned_expenses.map(pe => <li key={pe.id}>{pe.name} - {pe.cost} {this.state.trip.destination.code} - {pe.date} <button onClick={() => this.handleDeletePlannedExpense(pe)}className='delete-button'>x</button></li>)}
                        <li><b>Current Total: {this.sumPlannedExpenses()} {this.state.trip.destination.code}</b></li>
                </ul>

                <h2>Current Cost of Planned Expenses ($): {this.state.convertedAmt}</h2>
                <h2>Cost of Planned Expenses at time of Trip Pannning ($): {this.state.trip.values.find(value => value.date === this.state.trip.created_at)}</h2>
                
                <PlannedExpenseForm handleSubmit={this.handleAddPlannedExpense} addPe={this.addPe} trip={this.state.trip}/>


            </div> 
            
            
            
            : 
            
            
            
            
            <div className='unauthorized'>
                <h3>Sorry! You Cannot View Trips of Other Users</h3>
                <p>You may return to the Dashboard, or if you think this is your trip please log in to view it</p>
                <Link to='/dashboard'>Return to Dashboard</Link><br></br>
                <Link to='/'>Log In</Link><br></br>
            </div>
        )
    }
 


}