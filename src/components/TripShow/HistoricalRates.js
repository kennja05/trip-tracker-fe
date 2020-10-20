import React from 'react'
import Moment from 'react-moment'
import styled, {keyframes} from 'styled-components'
import fadeIn from 'react-animations'

export default class HistoricalRates extends React.Component {

    render(){
        const {destination, rates, startDate} = this.props
        const animation = keyframes`${fadeIn}`
        const FadeInDiv = styled.div`
            animate: 1s ${animation}
        `
        return(
            <div className='historical-rates'>
                <div className='hr-info'>
                    <FadeInDiv>
                        <h2 className='pe-h2'>This trip was planned on {startDate}</h2>
                        <p>Rates Since then:</p>
                        <ul>
                            {rates.map((vals,i) => <li key={i}> 
                            {destination.symbol}{vals.rate} {destination.code} : 
                            $1 USD 
                            (<Moment date={vals.date} format='MM-DD-YYYY hh:mm a'/>) 
                            </li>)}
                        </ul>
                    </FadeInDiv>
                </div>
            </div>
        )
    }
 
}