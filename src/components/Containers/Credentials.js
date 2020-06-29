import React from 'react'
import LoginForm from '../CredentialsComponents/LoginForm'
import SignupForm from '../CredentialsComponents/SignupForm'
import Title from '../CredentialsComponents/Title'

export default class Credentials extends React.Component {

    componentDidMount(){
        document.title = 'Trip Tracker | Login'
    }

    login = (user) => {
        this.props.handleLogin(user)
        this.props.history.push('dashboard')
    }

    render(){
        return(
            <div className='credential-page'>
                <Title />
                <LoginForm handleLogin={this.login} />
                <SignupForm handleLogin={this.login} />
            </div>
        )
    }
}