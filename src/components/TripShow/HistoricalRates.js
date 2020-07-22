import React from 'react'
import Moment from 'react-moment'

export default class HistoricalRates extends React.Component {

    render(){
        const {destination, rates, startDate} = this.props
        return(
            <div className='historical-rates'>
                <div className='hr-info'>
                    <h2 className='pe-h2'>This trip was planned on {startDate}</h2>
                    <p>Rates Since then:</p>
                    <ul>
                        {rates.map((vals,i) => <li key={i}> 
                        {destination.symbol}{vals.rate} {destination.code} : 
                        $1 USD 
                        (<Moment date={vals.date} format='MM-DD-YYYY hh:mm a'/>) 
                        </li>)}
                    </ul>
                </div>
            </div>
        )
    }
 
}