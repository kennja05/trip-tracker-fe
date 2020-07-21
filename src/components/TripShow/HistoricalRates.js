import React from 'react'

export default class HistoricalRates extends React.Component {


    // state={
    //     startRate: null,
    //     currentRate: null
    // }

    componentDidMount(){
        const {rates} = this.props
        const rateArray = []
    }

    // getFirstAndLastRates = (valueList, datePlanned) => {
    //     const myvals = valueList.filter(val => val.date === datePlanned)
    //     const fv = myvals[myvals.length-1].rate
    //     this.setState({
    //         startRate: fv,
    //         currentRate: valueList[valueList.length-1].rate
    //     })
    // }

    formatDate = dateStr => { //will format a date string that looks like '2020-07-21T14:17:21.717Z' 
        let arr = dateStr.split('T')
    }

    render(){
        return(
            <div className='historical-rates'>
                <div className='hr-info'>
                    <h2 className='pe-h2'>This trip was planned on {this.props.startDate}</h2>
                    <p>Rate Changes Since then:</p>
                    <ul>
                        {this.props.rates.map((vals,i) => <li key={i}>Date: {vals.date} || 
                        Exchange Rate: {vals.rate} {vals.code} : 1 USD</li>)}
                    </ul>
                </div>
            </div>
        )
    }
 

}