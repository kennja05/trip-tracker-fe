import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarTimes} from '@fortawesome/free-solid-svg-icons'

export default class Delete extends React.Component {

    render(){
        return(
        <span id='delete-icon'>
            <FontAwesomeIcon size='2x' icon={faCalendarTimes} />
        </span>
        )
    }

} 