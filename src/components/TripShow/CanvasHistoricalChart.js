import React from 'react'
import CanvasJSReact from '../../canvasjs.react';
// var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class CanvasHistoricalChart extends React.Component {

    state = {
        coordinates: []
    }

    componentDidMount(){
        const myObj = []
        // eslint-disable-next-line
        this.props.values.map((val,i) =>{
            myObj.push({x: i, y: val.rate, date: new Date(Date.parse(val.date)).toString().slice(0,24)})
        })
        this.setState({
            coordinates: myObj
        })
    }


    render(){        
        const options = {
            animationsEnabled: true,
            exportEnabled: true,
            title: {
              fontColor: '#cc3a00',  
              text: "Exchange Rate Over Time"
            },
            axisY: {
                title: `${this.props.destination.currency_name} to USD`,
                includeZero: false,
                suffix: this.props.destination.symbol
            },
            axisX: {
                title: "Rates Obtained"
            },
            data: [{				
                      type: "line",
                      lineColor: '#cc3a00',
                      theme: 'light4',
                      toolTipContent: '{y} - {date}',
                      dataPoints: this.state.coordinates
             }]
        }
        return (
            <div className='canvas-chart-container'>
                <CanvasJSChart className='canvas-chart' options={options}/>
            </div>
        )
    }
}