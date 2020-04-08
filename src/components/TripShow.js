import React from 'react'
import { Link } from 'react-router-dom'
import PlannedExpenseForm from './forms/PlannedExpenseForm'
import NavBar from './NavBar'
import HistoricalRates from './HistoricalRates'
// import HistoricalChart from './HistoricalChart' - Uses victory chart library
import CanvasHistoricalChart from './CanvasHistoricalChart'
import PePieChart from './PePieChart'


export default class TripShow extends React.Component {

    state = {
        trip: {},
        loaded: false,
        plannedExpenses: [],
        totalPe: null,
        beginningDollarAmt: null,
        currentDollarAmt: null,
        showHrChart: false,
        showHistoricalRates: false,
        showPePie: true
    }

    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/trips/${this.props.match.params.id}`) 
            .then(res => res.json())
            .then(trp => this.setState({
                trip: trp,
                loaded: true,
                plannedExpenses: trp.planned_expenses
            }))
            .then(() => this.sumPlannedExpenses(this.state.plannedExpenses))
            .then(() => this.currentCostInDollars())
    }

    componentDidUpdate(prevProps, prevState){
        // if (prevState.plannedExpenses.length !== 0 && prevState.plannedExpenses.length !== this.state.plannedExpenses.length){
        //     console.log(prevState.plannedExpenses, 'new state:', this.state.plannedExpenses)
        // }
        if (prevState.totalPe !== this.state.totalPe) {
            this.currentCostInDollars()
        }
    }

    handleDeletePlannedExpense = (plannedExp) => {
        fetch(`http://localhost:3000/api/v1/planned_expenses/${plannedExp.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => this.setState({
            plannedExpenses: this.state.plannedExpenses.filter(pe => pe.id !== data.id)
        }))
        .then(() => this.sumPlannedExpenses(this.state.plannedExpenses))
        .then(() => this.currentCostInDollars())
    }

    addPe = (plannedExp) => {
        this.setState({plannedExpenses: [...this.state.plannedExpenses, plannedExp]})
        this.sumPlannedExpenses(this.state.plannedExpenses)
    }

    sumPlannedExpenses = (peList) => {
        const costsArray = peList.map(pe => pe.cost)
        const sum = costsArray.reduce(function(a,b){
            return a + b
        }, 0)
        this.setState({totalPe: sum})
    }

    currentCostInDollars = () => {
        const currentCost = (this.state.totalPe / this.state.trip.values[this.state.trip.values.length-1].rate).toFixed(2)
        const allValsAtCreationArray = this.state.trip.values.filter(val => val.date === this.state.trip.created_at.slice(0,10))
        const valAtCreation = allValsAtCreationArray[allValsAtCreationArray.length -1]
        const origCost = (this.state.totalPe / valAtCreation.rate).toFixed(2)
        this.setState({
            currentDollarAmt: currentCost,
            beginningDollarAmt: origCost
        })
    }


    render(){
        return(
            this.state.loaded ?
            // && this.props.user && this.props.user.id === this.state.trip.user_id 
            <div>
                <NavBar user={this.props.user} history={this.props.history} logout={this.props.logout}/>
                <div className='trip-show-container'>
                    <div className='trip-show'>
                        <h1>Your Trip to: {this.state.loaded && this.state.trip.destination.name} </h1>
                        <img className='flag-pic' alt='flag' src={this.state.trip.destination.image} />
                        <h2>Start Date: {this.state.trip.start_date}</h2>
                        <h2>End Date: {this.state.trip.end_date}</h2>
                        <h2>Destination Info</h2>
                        <ul>
                            <li><b>Native Name: </b>{this.state.trip.destination.native_name}</li>
                            <li><b>Capital: </b> {this.state.trip.destination.capital}</li>
                            <li><b>Currency Name: </b>{this.state.trip.destination.currency_name} ({this.state.trip.destination.symbol})</li>
                            <ul><li>Official Currency Code: {this.state.trip.destination.code}</li></ul>
                        </ul>
                        <h2>Current Planned Expenses (Name || Cost || Date):</h2>  
                        <ul>
                            {this.state.plannedExpenses.length !==0 ? this.state.plannedExpenses.map(pe => <li key={pe.id}>{pe.name} <b>||</b> {pe.cost} {this.state.trip.destination.code} <b>||</b> {pe.date} <button onClick={() => this.handleDeletePlannedExpense(pe)}className='delete-button'>x</button></li>) : <li>No Expenses Have Been Budgeted Yet</li>}
                        </ul>
                        <hr></hr>
                        <h2>Current Total ({this.state.trip.destination.symbol}): {this.state.totalPe} {this.state.trip.destination.code}</h2>
                        <h2>Current Cost of Planned Expenses ($): <span style={{color: `${this.state.currentDollarAmt <= this.state.beginningDollarAmt ? '#86c232' : 'red'}`}}>{this.state.currentDollarAmt}</span> USD</h2>
                        <h2>Cost of Planned Expenses at time of Trip Pannning ($): {this.state.beginningDollarAmt} USD</h2>
                    </div>
                    <div className='pe-form-and-trip-rates'>    
                        <PlannedExpenseForm handleSubmit={this.handleAddPlannedExpense} addPe={this.addPe} trip={this.state.trip}/>
                        <div className='display-buttons-container'>
                            <span className='display-buttons'>Detailed Historical Rates</span>
                            <span classname='display-buttons'>Historical Rates Graph</span>
                            <span className='display-buttons'>Planned Expenses Breakdown</span>
                        </div>
                        {this.state.showHistoricalRates && <HistoricalRates destination={this.state.trip.destination} startDate={this.state.trip.created_at.slice(0,10)} values={this.state.trip.values} cost={this.state.totalPe}/>}
                        {this.state.showHrChart && <CanvasHistoricalChart destination={this.state.trip.destination} startDate={this.state.trip.created_at.slice(0,10)} values={this.state.trip.values} /> }
                        {this.state.showPePie && <PePieChart plannedExpenses={this.state.plannedExpenses} total={this.state.totalPe}/> }
                    </div>
                </div>
            </div>
            
            : 
            
            
            <div className='unauthorized'>
                <h1>Sorry! You Cannot View Trips of Other Users</h1>
                <p>You may return to the Dashboard, or if you think this is your trip please log in to view it</p>
                <Link className='unauthorized-link' to='/dashboard'>Return to Dashboard</Link><br></br>
                <Link className='unauthorized-link' to='/'>Log In</Link><br></br>
            </div>
        )
    }
}