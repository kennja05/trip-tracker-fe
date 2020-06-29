import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarTimes} from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'

export default class Delete extends React.Component {

    render(){
        return(
        <span id='delete-icon' data-tip="Click the icon to delete the record of this trip">
            <FontAwesomeIcon size='2x' icon={faCalendarTimes} />
            <ReactTooltip backgroundColor='red' place="right" type="warning" effect="float"/>
        </span>
        )
    }

} 