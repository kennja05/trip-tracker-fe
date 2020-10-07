import React from 'react'
import LoginForm from '../CredentialsComponents/LoginForm'
import SignupForm from '../CredentialsComponents/SignupForm'
import Title from '../CredentialsComponents/Title'
import styled, { keyframes } from 'styled-components'
import { zoomIn } from 'react-animations'
export default class Credentials extends React.Component {

    componentDidMount(){
        document.title = 'Trip Tracker | Login'
    }

    login = (user) => {
        this.props.handleLogin(user)
        this.props.history.push('dashboard')
    }

    render(){
        const fadeInAnimation = keyframes`${zoomIn}`
        const FadeInDiv = styled.div`
            animation: 2s ${fadeInAnimation}
        `
        return(
            <div className='credential-page'>
                <FadeInDiv>
                    <Title />
                </FadeInDiv>
                <LoginForm handleLogin={this.login} />
                <SignupForm handleLogin={this.login} />
            </div>
        )
    }
}