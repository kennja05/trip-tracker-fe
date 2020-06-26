import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarTimes} from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'

export default class Delete extends React.Component {

    render(){
        console.log(this.props)
        return(
        <span onClick={() => this.deleteTrip(this.props.tripId)} data-tip="Click the icon to delete this trip">
            <FontAwesomeIcon icon={faCalendarTimes} />
            <ReactTooltip backgroundColor='red' place="right" type="warning" effect="float"/>
        </span>
        )
    }

}