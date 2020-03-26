import React from 'react'
import LoginForm from './forms/LoginForm'
import SignupForm from './forms/SignupForm'
import Title from './Title'

export default class Credentials extends React.Component {
    render(){
        return(
            <div className='credential-page'>
                <Title />
                <LoginForm handleLogin={this.props.handleLogin} routerProps={this.props} />
                <SignupForm handleSignup={this.props.handleSignup} routerProps={this.props}/>
            </div>
        )
    }
}