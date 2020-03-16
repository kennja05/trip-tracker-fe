import React from 'react'

export default class SignupForm extends React.Component {

    state = {
        name: '',
        username: '',
        password: '',
        passwordConfirmation: '',
        image: '',
        phone: '',
        email: ''
    }


    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        
        return(
            <form onSubmit={this.props.handleAuthenticate}> 
                <label>First Name:</label>
                <input onChange={this.handleFormChange} type='text' name='name' value={this.state.name}/>
                <label>Username:</label>
                <input onChange={this.handleFormChange} type='text' name='username' value={this.state.username}/>
                <label>Password:</label>
                <input onChange={this.handleFormChange} type='password' name='password' value={this.state.password} />
                <label>Re-Typed Password:</label>
                <input onChange={this.handleFormChange} type='password' name='passwordConfirmation' value={this.state.passwordConfirmation} />
                <label>Profile Picture URL:</label>
                <input onChange={this.handleFormChange} type='text' name='image' value={this.state.image} />
                <label>Phone Number:</label>
                <input onChange={this.handleFormChange} type='text' name='phone' value={this.state.phone} />
                <label>Email Address:</label>
                <input onChange={this.handleFormChange} type='text' name='email' value={this.state.email} />
                <input type='submit' value='Create Account' />
            </form>
        )
    }

}