import React from 'react'
import CanvasJSReact from '../../canvasjs.react';
// var CanvasJSReact = require('./canvasjs.react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import styled, {keyframes} from 'styled-components'
import fadeIn from 'react-animations'

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
                title: `USD to ${this.props.destination.currency_name}`,
                includeZero: false,
                suffix: "$"
            },
            axisX: {
                title: "Rates Obtained"
            },
            data: [{				
                      type: "line",
                      lineColor: '#cc3a00',
                      theme: 'light4',
                      // eslint-disable-next-line
                      toolTipContent: '${y} - {date}',
                      dataPoints: this.state.coordinates
             }]
        }
        const animation = keyframes`${fadeIn}`
        const FadeInDiv = styled.div`
            animate: 1s ${animation}
        `
        return (
            <div className='canvas-chart-container'>
                <FadeInDiv>
                    <CanvasJSChart className='canvas-chart' options={options}/>
                </FadeInDiv>
            </div>
        )
    }
}