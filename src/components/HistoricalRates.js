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
        const fv = valueList.filter(val => val.date === datePlanned)[0].rate
        this.setState({
            startRate: fv,
            currentRate: valueList[valueList.length-1].rate
        })
    }

    render(){
        return(
            <div className='historical-rates'>
                <h2>This trip was planned on {this.props.startDate}</h2>
                <p>Rate Changes Since then:</p>
                <ul>
                    {/* Get only the values from after the trip was created, then create the list */}
                    {this.props.values.filter(val => val.date >= this.props.startDate).map(vals => <li key={vals.id}>Date:{vals.date} Exchange Rate: {vals.rate} {vals.code} : 1 USD</li>)}
                </ul>
                {this.props.cost && `A trip costing 10,000 ${this.props.destination.currency_name} would cost ${(10000 / this.state.startRate).toFixed(2)} United States Dollars if the currency were exchanged at the time this trip was entered to the site. The same trip would cost ${(10000 / this.state.currentRate).toFixed(2)} if the currency were exchanged now.`}
            </div>
        )
    }


}