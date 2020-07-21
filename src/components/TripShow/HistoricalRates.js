import React from 'react'
import Moment from 'react-moment'

export default class HistoricalRates extends React.Component {

    render(){
        console.log(this.props)
        return(
            <div className='historical-rates'>
                <div className='hr-info'>
                    <h2 className='pe-h2'>This trip was planned on {this.props.startDate}</h2>
                    <p>Rate Changes Since then:</p>
                    <ul>
                        {this.props.rates.map((vals,i) => <li key={i}>Date:  
                        <Moment format='YYYY-MM-DD hh:mm a'>{vals.date}</Moment>
                            || 
                        Exchange Rate: {vals.rate} {this.props.destination.code} : 1 USD</li>)}
                    </ul>
                </div>
            </div>
        )
    }
 
}