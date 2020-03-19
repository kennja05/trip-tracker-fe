import React from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'
import PlannedExpenseForm from './forms/PlannedExpenseForm'


export default class TripShow extends React.Component {

    state = {
        trip: {},
        loaded: false,
        plannedExpenses: [],
        convertedAmt: null,
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

    handleAddPlannedExpense = (e, plannedExp) => {
        e.preventDefault()
        const peObject = {name: plannedExp.name, trip_id: this.state.trip.id, cost: plannedExp.cost, date: plannedExp.date, category: plannedExp.category}
        if (peObject.cost <= 0){
            alert('Please input an amount greater than or equal to 0')
        } else {
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
        }))}
    }


    sumPlannedExpenses = () => {
        if (this.state.loaded) {
        const costsArray = this.state.plannedExpenses.map(pe => pe.cost)
        const sum = costsArray.reduce(function(a,b){
            return a + b
        }, 0)
        return sum}
    }

    componentDidUpdate(prevProps, prevState){
        if (!this.state.convertedAmt || prevState.plannedExpenses.count !== this.state.plannedExpenses.count) {
            fetch(`http://data.fixer.io/api/convert?access_key=${process.env.REACT_APP_CURRENCY_CONVERTER_API_KEY}&from=${this.state.trip.destination.code}&to=USD&amount=8470`)
            .then(res => res.json())
            .then(amt => this.setState({convertedAmt: Math.round(amt.result * 100) / 100}))
        }
    }

    render(){
        if (this.state.trip.created_at !== undefined) {console.log(this.state.trip.created_at.slice(0,10))}
        return(
            this.state.loaded && this.props.user && this.props.user.id === this.state.trip.user_id? 
            <div className='trip-show'>
                <Link to='/dashboard'>Return to Dashboard</Link>
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

                <h2>Current Cost of Planned Expenses ($): {this.state.convertedAmt}</h2>
                <h2>Cost of Planned Expenses at time of Trip Pannning ($): [perform historical conversion]</h2>
                
                <PlannedExpenseForm handleSubmit={this.handleAddPlannedExpense} trip={this.state.trip}/>


            </div> : <div className='unauthorized'>
                <h3>Sorry! You Cannot View Trips of Other Users</h3>
                <ReactLoading type={'spin'} color={'000'} />
                <Link to='/dashboard'>Return to Dashboard</Link><br></br>
                <Link to='/'>Log In</Link>
                <Link to='/'>Sign Up</Link>
            </div>
        )
    }



}