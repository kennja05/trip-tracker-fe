import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


export default class AddTripForm extends React.Component {

    state = {
        loaded: false,
        destinations: [],
        startDate: new Date(),
        endDate: new Date(),
        selectedDestination: ''
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/destinations')
            .then(resp => resp.json())
            .then(destArray => this.setState({destinations: destArray, loaded: true}))
    }

    handleStartDateChange = (date) => {
        this.setState({
          startDate: date
        })
    }

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        })
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div className='Sub-Container'>
                <h2>Add A New Trip</h2>
                <form>

                Start Date: <DatePicker name='startDate' selected={this.state.startDate} onChange={this.handleStartDateChange} /><br></br>
                End Date: <DatePicker name='endDate' selected={this.state.endDate} onChange={this.handleEndDateChange} /><br></br>
                Location: <input onChange={this.handleFormChange} type='text' value={this.state.selectedDestination} name='selectedDestination' />
                </form>



            </div>
        )
    }


}