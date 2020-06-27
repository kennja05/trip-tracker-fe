import React from 'react'

export default class HistoricalRates extends React.Component {


    state={
        startRate: null,
        currentRate: null
    }

    componentDidMount(){
        const {values, startDate} = this.props
        this.getFirstAndLastRates(values, startDate)
    }

    getFirstAndLastRates = (valueList, datePlanned) => {
        const myvals = valueList.filter(val => val.date === datePlanned)
        const fv = myvals[myvals.length-1].rate
        this.setState({
            startRate: fv,
            currentRate: valueList[valueList.length-1].rate
        })
    }

    render(){
        return(
            <div className='historical-rates'>
                <div className='hr-info'>
                    <h2 className='pe-h2'>This trip was planned on {this.props.startDate}</h2>
                    <p>Rate Changes Since then:</p>
                    <ul>
                        {/* Get only the values from after the trip was created, then create the list */}
                        {this.props.values.filter(val => val.date >= this.props.startDate).map(vals => <li key={vals.id}>Date: {vals.date} || 
                        Exchange Rate: {vals.rate} {vals.code} : 1 USD</li>)}
                    </ul>
                </div>
            </div>
        )
    }
 

}