import React from 'react'
import PleaseLogin from '../Misc/PleaseLogin'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import styled, {keyframes} from 'styled-components'
import {fadeInLeft} from 'react-animations'

export default class AddTripForm extends React.Component {

    state = {
        loaded: false,
        destinations: [],
        startDate: new Date(),
        endDate: new Date(),
        selectedDestination: 'Afghanistan',
        foundDestinaion: null
    }

    componentDidMount(){
        fetch('https://trip-tracker-backend.herokuapp.com/api/v1/destinations')
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
            const formattedDestName = this.state.selectedDestination
            const foundCountry = this.state.destinations.find(dest => dest.name === formattedDestName)
            if (!foundCountry) {
                alert(`Sorry - we have no currency information for ${formattedDestName}!`)
            } else if (this.state.startDate > this.state.endDate) {
                alert('Please look at your selected dates. Make sure they are in the correct order!')
            } else {
                const tripObject = {start_date: this.state.startDate, end_date: this.state.endDate, 
                                    user_id: this.props.user.id, destination_id: foundCountry.id}
                fetch('https://trip-tracker-backend.herokuapp.com/api/v1/trips', {
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
        const {user} = this.props
        const {startDate, endDate, destinations}= this.state
        const animation = keyframes`${fadeInLeft}`
        const FadeInDivLeft = styled.div`
            animation: 1s ${animation}
        `
        return(
            user ? 
            <div id='add-trip' className='dashboard-container'>
                <FadeInDivLeft>
                    <div className='sub-dash-container-div'>
                        <h2 style={{fontFamily: 'Racing Sans One'}}><u>Add A New Trip</u></h2>
                        <form className='add-trip-form' onSubmit={this.handleFormSubmit}>
                            <label>Start Date:</label> 
                            <DatePicker dateFormat='MM/dd/yy' name='startDate' 
                                selected={startDate} onChange={this.handleStartDateChange} />
                            <div className='form-break'></div>
                            <label>End Date:</label>
                            <DatePicker dateFormat='MM/dd/yy' name='endDate' 
                                selected={endDate} onChange={this.handleEndDateChange} />
                            <div className='form-break'></div>
                            <label>Location:</label>
                            <select style={{width: '153px'}} name='selectedDestination' onChange={this.handleFormChange}>
                                {destinations.length > 0 && 
                                destinations.map(dest => <option key={dest.id} 
                                value={dest.name}>{dest.name}</option>)}
                            </select>
                            <div className='form-break'></div>
                            <input type='submit' value='Add Trip' />
                        </form>
                    </div>
                </FadeInDivLeft>
            </div> 
            : 
            <PleaseLogin direction='left' location='add' />
        )
    }


}