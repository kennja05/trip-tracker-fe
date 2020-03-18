import React from 'react'
import DatePicker from 'react-datepicker'

export default class PlannedExpenseForm extends React.Component {

    state = {
        name: '',
        cost: undefined,
        category: '',
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
        console.log(this.state.category)
        return(
            <div className='Sub-Container'>
                <h2>Input Your Planned Expense(s) Below</h2>
                <form>  
                    
                        <label>Expense Name: </label>
                        <input onChange={this.handleFormChange} type='text' name='name' value={this.state.name} />
                    <br></br>
                    
                        <label>Cost (in {this.props.trip.destination.code}): </label>
                        <input onChange={this.handleFormChange} type='number' value={this.state.cost} />
                    <br></br>
                    
                        <label>Category: </label>
                        <select onChange={this.handleFormChange}>
                            <option onChange={this.handleFormChange} name='Lodging' value={this.state.category}>Lodging</option>
                            <option onChange={this.handleFormChange} name='Food/Drink' value={this.state.category}> Food/Drink</option>
                            <option onChange={this.handleFormChange} name='Business' value={this.state.category}>Business</option>
                            <option onChange={this.handleFormChange} name='Entertainment' value={this.state.category}>Entertainment</option>
                            <option onChange={this.handleFormChange} name='Other' value={this.state.category}>Other</option>
                        </select>
                    <br></br>
                    
                        <label>Date: </label>
                        <DatePicker dateFormat='MM/dd/yy' name='date' selected={this.state.date} onChange={this.handleDateChange} />
                    

                </form>




            </div>
        )
    }

}