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
            myObj.push({x: index, y: val.rate})
        })
        this.setState({
            coordinates: myObj
        })
    }


    render(){
        const options = {
            title: {
              text: "Exchange Rate From Time of Planning"
            },
            data: [{				
                      type: "line",
                      animationEnabled: true,
                      exportEnabled: true,
                      theme: 'light4',
                      dataPoints: [
                          { label: "Apple",  y: 10  },
                          { label: "Orange", y: 15  },
                          { label: "Banana", y: 25  },
                          { label: "Mango",  y: 30  },
                          { label: "Grape",  y: 28  }
                      ]
             }]
         }
        return (
            <div>
                <CanvasJSChart options={options}/>
            </div>
        )
    }

}