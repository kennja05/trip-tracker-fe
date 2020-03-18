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

    render(){
        // console.log(this.state.category)
        return(
            <div className='Sub-Container'>
                <h2>Input Your Planned Expense(s) Below</h2>
                <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>  
                    
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