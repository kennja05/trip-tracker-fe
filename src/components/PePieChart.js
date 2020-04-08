import React from 'react'
import CanvasJSReact from '../canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PePieChart extends React.Component {
    
    state = {
        data: []
    }

    componentDidMount(){
        this.renderChart()
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.total !== this.props.total){
            this.renderChart()
        }
    }

    renderChart = () => {
        const myObj = {};
        this.props.plannedExpenses.forEach(pe => {
            myObj[pe.category] = myObj[pe.category] + pe.cost || pe.cost
        })
        const myArr = [];
        for (let c in myObj){
            switch (c) {
                case "Lodging":
                    let objL = {y: Math.round((myObj[c] * 100) / this.props.total), label: 'Business'}
                    myArr.push(objL)
                    break;
                case "Entertainment":
                    let objE = {y: Math.round((myObj[c] * 100) / this.props.total), label: 'Entertainment'}
                    myArr.push(objE)
                    break;
                case 'Business':
                    let objB = {y: Math.round((myObj[c] * 100) / this.props.total), label: 'Business'}
                    myArr.push(objB)
                    break;
                case 'Other':
                    let objO = {y: Math.round((myObj[c] * 100) / this.props.total), label: 'Other'}
                    myArr.push(objO)
                    break;
                case 'Food/Drink':
                    let objF = {y: Math.round((myObj[c] * 100) / this.props.total), label: 'Food/Drink'}
                    myArr.push(objF)       
                    break;
                default:
                    console.log('uh oh')
            }
        }
        this.setState({
            data: myArr
        })
    }

    render(){
        const options = {
			exportEnabled: true,
            animationEnabled: true,
            indexLabelFontSize: 16,
			title: {
				text: "Planned Expenses By Category"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: this.state.data
			}]
        }
        return(
            <div className='pie-chart'>
                {this.props.plannedExpenses.length > 0 ? <CanvasJSChart options={options} /> : <div>Input Planned Expenses Above</div>}
            </div>
        )
    }


}