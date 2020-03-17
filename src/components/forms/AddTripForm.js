import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


export default class AddTripForm extends React.Component {

    state = {
        loaded: false,
        destinations: [],
        startDate: new Date(),
        endDate: new Date(),
        selectedDestination: '',
        foundDestinaion: null
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

    handleFormSubmit = e => {
        e.preventDefault()
        if (this.state.selectedDestination){

            const formattedDestName = this.state.selectedDestination[0].toUpperCase() + this.state.selectedDestination.slice(1).toLowerCase()
            const foundCountry = this.state.destinations.find(dest => dest.name === formattedDestName)
            if (!foundCountry) {
                alert(`Sorry - we have no currency information for ${formattedDestName}!`)
            } else {
                console.log('start:', this.state.startDate, 'end:', this.state.endDate)
            }
        }
    }

    render(){
        return(
            <div className='Sub-Container'>
                <h2>Add A New Trip</h2>
                <form onSubmit={this.handleFormSubmit}>

                Start Date: <DatePicker dateFormat='MM/dd/yy' name='startDate' selected={this.state.startDate} onChange={this.handleStartDateChange} /><br></br>
                End Date: <DatePicker dateFormat='MM/dd/yy' name='endDate' selected={this.state.endDate} onChange={this.handleEndDateChange} /><br></br>
                Location: <input onChange={this.handleFormChange} type='text' value={this.state.selectedDestination} name='selectedDestination' /><br></br>
                <input type='submit' value='Add Trip' />
                </form>



            </div>
        )
    }


}