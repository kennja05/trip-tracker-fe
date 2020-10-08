import React from 'react'
import {Link} from 'react-router-dom'
import styled, {keyframes} from 'styled-components'
import { fadeInLeft, fadeInRight } from 'react-animations'

class PleaseLogin extends React.Component {
    
    state = {
        location: undefined,
        message: undefined
    }

    componentDidMount(){
        const {location} = this.props
        switch(location){
            case 'past' :
                this.setState({
                    location: 'Past Trips',
                    message: 'Please log in to see your past trips'
                })
                break;
            case 'present' :
                this.setState({
                    location: 'Upcoming Trips',
                    message: 'Please log in to see your upcoming trips'
                })
                break;
            case 'add' :
                this.setState({
                    location: 'Add a New Trip',
                    message: 'Please log in to add new trips'
                })
                break;
            default :
                console.log('Message me how you got here lol. github: kennja05')    
        }
    }

    
    render(){
        const {location, message} = this.state
        const {direction} = this.props
        const fadeAnimationLeft = keyframes`${fadeInLeft}`
        const FadeInDivLeft = styled.div`
            animation: 1s ${fadeAnimationLeft};
        `
        const fadeAnimationRight = keyframes`${fadeInRight}`
        const FadeInDivRight = styled.div`
            animation: 1s ${fadeAnimationRight};
        `
        return(
            direction === 'left' ? 
            <div className='dashboard-container'>
                <FadeInDivLeft>
                    <div className='sub-dash-container-div'>
                    <h2><u>{location}</u></h2>
                        <Link className='link' to='/'><b>{message}</b></Link>
                    </div>
                </FadeInDivLeft>
            </div>
            :
            <div className='dashboard-container'>
                <FadeInDivRight>
                    <div className='sub-dash-container-div'>
                    <h2><u>{location}</u></h2>
                        <Link className='link' to='/'><b>{message}</b></Link>
                    </div>
                </FadeInDivRight>
            </div>

        )        
    }
}

export default PleaseLogin