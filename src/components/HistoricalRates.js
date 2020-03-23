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
        console.log(this.state)
        return(
            <div className='historical-rates'>
                <h2>This trip was planned on {this.props.startDate}</h2>
                <p>Rate Changes Since then:</p>
                <ul>
                    {this.props.values.filter(val => val.date >= this.props.startDate).map(vals => <li key={vals.id}>Date:{vals.date} Exchange Rate: {vals.rate} {vals.code} : 1 USD</li>)}
                </ul>
                {this.props.cost && `A trip of 10000`}
            </div>
        )
    }



}