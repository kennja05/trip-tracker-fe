import React from 'react'
import { VictoryLine, VictoryChart} from 'victory'



export default class HistoricalChart extends React.Component {

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
        return(
            <div className='historical-chart-container'>
                <h2 className='chart-title'>{this.props.destination.currency_name}({this.props.destination.symbol}) to USD($)</h2>
                <div className='chart-y-label'>
                    <span className='y-axis'>{this.props.destination.currency_name}({this.props.destination.symbol}) to 1 USD($)</span>
                    <div className='chart'>
                        <VictoryChart width={500} padding={40} title='good' style={{color: "white"}}>
                            <VictoryLine  data={this.state.coordinates} style={{data: { stroke: "#86c232" },parent:{ border: "1px solid #86c232"}}} />
                        </VictoryChart>
                    </div>
                </div>
            </div>
        )
    }



}