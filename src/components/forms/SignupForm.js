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

    handleSubmit = (e) => {
        e.preventDefault()
        const {name, username, password, image, phone, email} = this.state
        const userObj = {name, username, password, image, phone, email}
        fetch('http://localhost:3000/api/v1/users',{
          method: "POST",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userObj)
        })
        .then(resp => resp.json())
        .then(newUser => this.props.handleSignup(newUser))
        .then(this.props.routerProps.history.push('/dashboard'))
      }

    render(){
        return(
            <div className='signup-form'>
            
            <h2>New User? Sign up below</h2>

            <form onSubmit={this.handleSubmit}> 
                <p><label>First Name:</label>
                <input onChange={this.handleFormChange} type='text' name='name' value={this.state.name}/></p>
                <p><label>Username:</label>
                <input onChange={this.handleFormChange} type='text' name='username' value={this.state.username}/></p>
                <p><label>Password:</label>
                <input onChange={this.handleFormChange} type='password' name='password' value={this.state.password} /></p>
                <p><label>Re-Typed Password:</label>
                <input onChange={this.handleFormChange} type='password' name='passwordConfirmation' value={this.state.passwordConfirmation} /></p>
                <p><label>Profile Picture URL:</label>
                <input onChange={this.handleFormChange} type='text' name='image' value={this.state.image} /></p>
                <p><label>Phone Number:</label>
                <input onChange={this.handleFormChange} type='text' name='phone' value={this.state.phone} /></p>
                <p><label>Email Address:</label>
                <input onChange={this.handleFormChange} type='text' name='email' value={this.state.email} /></p>
                <input type='submit' value='Create Account' />
            </form>

            </div>
        )
    }

}