import React from 'react'
import LoginForm from './forms/LoginForm'
import SignupForm from './forms/SignupForm'

export default class Credentials extends React.Component {
    render(){
        return(
            <div>
                <SignupForm handleLogin={this.props.handleLogin}/>
            </div>
        )
    }
}