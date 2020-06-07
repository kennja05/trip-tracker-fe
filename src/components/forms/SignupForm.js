import React from 'react'

export default class SignupForm extends React.Component {

    state = {
        username: '',
        password_digest: '',
        passwordConfirmation: '',
        phone: '',
    }


    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })    
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {username, password_digest, phone} = this.state
        const userObj = {username, password_digest, phone}
        fetch('http://localhost:3000/api/v1/users',{
          method: "POST",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userObj)
        })
        .then(resp => resp.json())
        .then(user => this.props.handleLogin(user))
      }

    render(){
        return(
            <div className='signup-form'>
            
            <h2>New User? Sign up below</h2>

            <form onSubmit={this.handleSubmit}> 
                
                <p><label>Username:</label>
                <input onChange={this.handleFormChange} type='text' name='username' value={this.state.username}/></p>
                
                <p><label>Password:</label>
                <input onChange={this.handleFormChange} type='password' name='password_digest' value={this.state.password_digest} /></p>
                
                <p><label>Re-Typed Password:</label>
                <input onChange={this.handleFormChange} type='password' name='passwordConfirmation' value={this.state.passwordConfirmation} /></p>
                
                <p><label>Phone Number:</label>
                <input onChange={this.handleFormChange} type='text' name='phone' value={this.state.phone} /></p>
                
                <input type='submit' value='Create Account' />
            </form>

            </div>
        )
    }

}