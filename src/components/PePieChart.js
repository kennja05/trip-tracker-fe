import React from 'react'
import CanvasJSReact from '../canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PePieChart extends React.Component {
    
    state = {
        dataPoints: {
            business: '',
            entertainment: '',
            foodAndDrink: '',
            other: '',
            lodging: '',
        }
    }

    componentDidMount(){
        console.log('mounted')
    }

    render(){
        const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Planned Expenses By Category"
			},
			data: [{
				type: "pie",
				startAngle: 0,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: 18, label: "Direct" },
					{ y: 49, label: "Organic Search" },
					{ y: 9, label: "Paid Search" },
					{ y: 5, label: "Referral" },
					{ y: 19, label: "Social" }
				]
			}]
        }
        console.log(this.props)
        return(
            <div>
                <CanvasJSChart options={options} />
            </div>
        )
    }


}