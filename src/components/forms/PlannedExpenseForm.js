import React from 'react'
import DatePicker from 'react-datepicker'

export default class PlannedExpenseForm extends React.Component {

    state = {
        name: '',
        cost: 0,
        category: 'Other',
        date: new Date()
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDateChange = (date) => {
        this.setState({
          date: date
        })
    }

    handleAddPlannedExpense = (e) => {
        e.preventDefault()
        
        const peObject = {name: this.state.name, trip_id: this.props.trip.id, cost: this.state.cost, date: this.state.date, category: this.state.category}
        if (peObject.cost <= 0){
            alert('Please input an amount greater than or equal to 0')
        } else if (peObject.date < this.props.trip.start_date || peObject.date > this.props.trip.end_date){
            alert(`Please only add expenses for the trip beginning on ${this.props.trip.start_date} and ending ${this.props.trip.end_date}`)
        } else {
        fetch('http://localhost:3000/api/v1/planned_expenses', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(peObject)
        })
        .then(res => res.json())
        .then(pe => this.props.addPe(pe))
        .then(() => this.setState({name: '', cost: 0, date: new Date(), category: 'Other'}))    
    }
    }


    render(){
        return(
            <div className='Sub-Container'>
                <h2>Input Your Planned Expense(s) Below</h2>
                <form onSubmit={this.handleAddPlannedExpense}>  
                    
                        <label>Expense Name: </label>
                        <input onChange={this.handleFormChange} type='text' name='name' value={this.state.name} />
                    <br></br>
                    
                        <label>Cost (in {this.props.trip.destination.code}): </label>
                        <input onChange={this.handleFormChange} type='number' name='cost' value={this.state.cost} />
                    <br></br>
                    
                        <label>Category: </label>
                        <select name='category' value={this.state.category} onChange={this.handleFormChange}>
                            <option value="Lodging">Lodging</option>
                            <option value="Food/Drink"> Food/Drink</option>
                            <option value="Business">Business</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                        </select>
                    <br></br>
                    
                        <label>Date: </label>
                        <DatePicker dateFormat='MM/dd/yy' name='date' selected={this.state.date} onChange={this.handleDateChange} />
                    <br></br>
                    <input type='submit' value='Add Expense' />

                </form>




            </div>
        )
    }

}