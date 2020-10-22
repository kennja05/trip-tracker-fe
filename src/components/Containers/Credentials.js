import React from 'react'
import LoginForm from '../CredentialsComponents/LoginForm'
import SignupForm from '../CredentialsComponents/SignupForm'
import Title from '../CredentialsComponents/Title'
import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'
export default class Credentials extends React.Component {

    componentDidMount(){
        document.title = 'Trip Tracker | Login'
    }

    login = (user) => {
        this.props.handleLogin(user)
        this.props.history.push('dashboard')
    }

    render(){
        const fadeInAnimation = keyframes`${fadeIn}`
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
                <div id='icon-credit'>Airplane icon made by <a href="https://www.flaticon.com/authors/freepik" 
                title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 
                title="Flaticon"> www.flaticon.com</a></div>
            </div>
        )
    }
}