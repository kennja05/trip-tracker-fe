import React from 'react'
import PleaseLogin from '../Misc/PleaseLogin'
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
            .then(destArray => this.setState({
                destinations: destArray, 
                loaded: true}))
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
            const formattedDestName = this.state.selectedDestination.toUpperCase()
            const foundCountry = this.state.destinations.find(dest => dest.name === formattedDestName)
            if (!foundCountry) {
                alert(`Sorry - we have no currency information for ${formattedDestName}!`)
            } else if (this.state.startDate > this.state.endDate) {
                alert('Please look at your selected dates. Make sure they are in the correct order!')
            } else {
                const tripObject = {start_date: this.state.startDate, end_date: this.state.endDate, 
                                    user_id: this.props.user.id, destination_id: foundCountry.id}
                fetch('http://localhost:3000/api/v1/trips', {
                    method: 'POST', 
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(tripObject)
                })
                .then(res => res.json())
                .then(data => this.props.history.push(`/trip/${data.id}`))
            }
        }
    }
 
    render(){
        return(
            //checking to make sure the user is logged in before allowing new trips
            this.props.user ? 
            <div className='add-trip-div'>
                <div className='sub-dash-container-div'>
                    <h2><u>Add A New Trip</u></h2>
                    <form className='add-trip-form' onSubmit={this.handleFormSubmit}>
                        <label>Start Date:</label> 
                        <DatePicker dateFormat='MM/dd/yy' name='startDate' 
                            selected={this.state.startDate} onChange={this.handleStartDateChange} />
                        <div className='form-break'></div>
                        <label>End Date:</label>
                        <DatePicker dateFormat='MM/dd/yy' name='endDate' 
                            selected={this.state.endDate} onChange={this.handleEndDateChange} />
                        <div className='form-break'></div>
                        <label>Location:</label>
                        <select name='selectedDestination' onChange={this.handleFormChange}>
                            {this.state.destinations.length > 0 && 
                            this.state.destinations.map(dest => <option key={dest.id} 
                            value={dest.name}>{dest.name}</option>)}
                        </select>
                        <div className='form-break'></div>
                        <input type='submit' value='Add Trip' />
                    </form>
                </div>
            </div> 
            : 
            <PleaseLogin location='add' />
        )
    }


}