import React from 'react'
import CanvasJSReact from '../canvasjs.react';
// var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class CanvasHistoricalChart extends React.Component {

    state = {
        coordinates: []
    }

    componentDidMount(){
        const myObj = []
        this.props.values.filter(val => val.date >= this.props.startDate).map((val, index) => {
            myObj.push({x: index / 3, y: val.rate})
        })
        this.setState({
            coordinates: myObj
        })
    }


    render(){
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            // theme: 'light3',
            title: {
              text: "Exchange Rate Since Trip Input"
            },
            axisY: {
                title: `${this.props.destination.currency_name} to USD`,
                includeZero: false,
                suffix: this.props.destination.symbol
            },
            axisX: {
                title: "Days Since Planning",
                interval: 3
            },
            data: [{				
                      type: "line",
                      animationEnabled: true,
                      exportEnabled: true,
                      theme: 'light4',
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