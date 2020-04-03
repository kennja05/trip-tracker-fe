import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory'



export default class HistoricalChart extends React.Component {

    state = {
        coordinates: []
    }

    componentDidMount(){
            const myObj = []
            this.props.values.map((val, index) => {
                myObj.push({x: index, y: val.rate})
            })
            this.setState({
                coordinates: myObj
            })
    }

    render(){
        console.log(this.state.coordinates)
        return(
            <div className='historical-chart-container'>
                <VictoryChart title='good'animate={{duration: 1000}} style={{color: "white"}}>
                    <VictoryLine  data={this.state.coordinates} style={{data: { stroke: "#86c232" },parent:{ border: "1px solid #86c232"}}} />
                </VictoryChart>
            </div>
        )
    }



}