import React from 'react'
import { Link } from 'react-router-dom'
import PlannedExpenseForm from '../TripShow/PlannedExpenseForm'
import HistoricalRates from '../TripShow/HistoricalRates'
import CanvasHistoricalChart from '../TripShow/CanvasHistoricalChart'
import PePieChart from '../TripShow/PePieChart'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'


export default class TripShow extends React.Component {

    state = {
        trip: {},
        rates: [],
        loaded: false,
        plannedExpenses: [],
        totalPe: null,
        beginningDollarAmt: null,
        currentDollarAmt: null,
        display: {
            showHrChart: false,
            showHistoricalRates: false,
            showPePie: true
        }
    }

    //need to get trip info into state, and then rates immediately after..
    componentDidMount(){
        fetch(`https://trip-tracker-backend.herokuapp.com/api/v1/trips/${this.props.match.params.id}`) 
            .then(res => res.json())
            .then(trp => this.setState({
                trip: trp,
                plannedExpenses: trp.planned_expenses
            }))
            .then(() => this.getRates())
            .then(() => this.sumPlannedExpenses(this.state.plannedExpenses))
            .then(() => document.title = `Trip Tracker | Details `)
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.totalPe !== this.state.totalPe) {
            this.convertCurrency()
        }
    }

    convertCurrency = () => {
        // let startAmnt = (this.state.totalPe / this.state.rates[0].rate)
        // console.log(startAmnt)
    }

    currentCostInDollars = () => {
        // const currentCost = (this.state.totalPe / this.state.trip.values[this.state.trip.values.length-1].rate).toFixed(2)
        // const allValsAtCreationArray = this.state.trip.values.filter(val => val.date === this.state.trip.created_at.slice(0,10))
        // const valAtCreation = allValsAtCreationArray[allValsAtCreationArray.length -1]
        // const origCost = (this.state.totalPe / valAtCreation.rate).toFixed(2)
        // this.setState({
        //     currentDollarAmt: currentCost,
        //     beginningDollarAmt: origCost
        // })
    }

    getRates = () => {
        const createdAt = this.state.trip.created_at.slice(0, 10)
        const code = this.state.trip.destination.code
        fetch(`https://trip-tracker-backend.herokuapp.com/api/v1/rates/${createdAt}/${code}`)
            .then(res => res.json())
            .then(rateList => this.setState({
                rates: rateList,
                loaded: true
            }))
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

    handleDeletePlannedExpense = (plannedExp) => {
        fetch(`https://trip-tracker-backend.herokuapp.com/api/v1/planned_expenses/${plannedExp.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => this.setState({
            plannedExpenses: this.state.plannedExpenses.filter(pe => pe.id !== data.id)
        }))
        .then(() => this.sumPlannedExpenses(this.state.plannedExpenses))
        .then(() => this.currentCostInDollars())
    }

    handleDisplayButtonClick = (e) => {
        switch (e.target.id){
            case 'hr':
                this.setState({
                    display: {showHistoricalRates: true, showHrChart: false, showPePie: false}
                })
                break;
            case 'hrg':
                this.setState({
                    display: {showHistoricalRates: false, showHrChart: true, showPePie: false}
                })
                break;
            case 'peb':
                this.setState({
                    display: {showHistoricalRates: false, showHrChart: false, showPePie: true}
                }) 
                break;  
            default: 
                console.log('shouldnt have done that')
        }
    }

    render(){
        const {user} = this.props
        const {loaded, trip, plannedExpenses, totalPe, rates, display} = this.state
        return(
            loaded && user && user.id === trip.user_id ?
                <div className='trip-show-container'>
                    <div className='trip-show'>
                        <h1 style={{fontFamily: 'Racing Sans One'}}>Your Trip to: {trip.destination.name}</h1>
                        <img className='flag-pic' alt='flag' src={trip.destination.image} />
                        <h2>Start Date: {trip.start_date}</h2>
                        <h2>End Date: {trip.end_date}</h2>
                        <h2>Destination Info</h2>
                        <ul>
                            <li><b>Native Name: </b>{trip.destination.native_name}</li>
                            <li><b>Capital: </b> {trip.destination.capital}</li>
                            <li><b>Currency Name: </b>{trip.destination.currency_name} ({trip.destination.symbol})</li>
                            <ul><li>Official Currency Code: {trip.destination.code}</li></ul>
                        </ul>
                        <h2>Current Planned Expenses (Name || Cost || Date)</h2>  
                        <div id='pe-list-container'>
                            <ul>
                                {plannedExpenses.length !==0 ? 
                                plannedExpenses.map(pe => <li key={pe.id}>{pe.name} <b>||
                                </b> {pe.cost} {trip.destination.code} <b>||</b> {pe.date}
                                <span onClick={() => this.handleDeletePlannedExpense(pe)}
                                className='delete-button'> <FontAwesomeIcon icon={faTimesCircle}/></span></li>)
                                : 
                                <li style={{fontFamily: 'Racing Sans One'}}>No Expenses Have Been Budgeted Yet</li>}
                            </ul>
                        </div>
                        <h2>Current Total ({trip.destination.symbol}): {totalPe} {trip.destination.code}</h2>
                        <h2>Current Cost of Planned Expenses ($): {(totalPe / rates[rates.length -1].rate).toFixed(2)} USD</h2>
                        <h2>Cost of Planned Expenses at time of Trip Pannning ($): {(totalPe / rates[0].rate).toFixed(2)} USD</h2>
                    </div>
                    <div className='pe-form-and-trip-rates'>
                        <PlannedExpenseForm addPe={this.addPe} trip={this.state.trip}/>
                        <div className='display-buttons-container'>
                            {!this.state.display.showHistoricalRates && 
                            <span 
                                onClick={(e) => this.handleDisplayButtonClick(e)} id='hr' 
                                className='display-buttons'>Detailed Historical Rates
                            </span>}
                            {!this.state.display.showHrChart && 
                            <span 
                                onClick={(e) => this.handleDisplayButtonClick(e)} id='hrg'
                                className='display-buttons'>Historical Rates Graph
                            </span>}
                            {!this.state.display.showPePie && 
                            <span 
                                onClick={(e) => this.handleDisplayButtonClick(e)} id='peb' 
                                className='display-buttons'>Planned Expenses Breakdown
                            </span>}
                        </div>
                        {display.showHistoricalRates && 
                            <HistoricalRates destination={trip.destination} 
                            startDate={trip.created_at.slice(0,10)} rates={rates}/>}
                        {display.showHrChart && 
                            <CanvasHistoricalChart destination={trip.destination} 
                            startDate={trip.created_at.slice(0,10)} values={rates} /> }
                        {display.showPePie && 
                            <PePieChart plannedExpenses={plannedExpenses} total={totalPe}/> }
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