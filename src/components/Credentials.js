import React from 'react'
import LoginForm from './forms/LoginForm'
import SignupForm from './forms/SignupForm'
import Title from './Title'

export default class Credentials extends React.Component {


    login = (user) => {
        this.props.handleLogin(user)
        this.props.history.push('dashboard')
    }

    render(){
        console.log(this.props)
        return(
            <div className='credential-page'>
                <Title />
                <LoginForm handleLogin={this.login} history={this.props.history} />
                <SignupForm handleSignup={this.props.handleSignup} routerProps={this.props}/>
            </div>
        )
    }
}