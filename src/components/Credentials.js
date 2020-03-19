import React from 'react'
import LoginForm from './forms/LoginForm'
import SignupForm from './forms/SignupForm'

export default class Credentials extends React.Component {
    render(){
        return(
            <div>
                <LoginForm handleLogin={this.props.handleLogin} routerProps={this.props} />
                <SignupForm handleSignup={this.props.handleSignup} routerProps={this.props}/>
            </div>
        )
    }
}