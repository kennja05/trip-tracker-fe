import React from 'react'

export default class LoginForm extends React.Component {

    state = {
        username: '',
        password: ''
    }

    

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {username, password} = this.state
        if (username !== '' && password !== '') {
            const foundUser = {username, password}
            console.log(foundUser)
        } else {
            alert('Please complete both fields')
        }
    }


    render(){
        return(
            <div className='credential-form'>
                <h2>Returning User? Log In </h2>
            <form onSubmit={this.handleSubmit}>
                <p><label>Username:</label>
                <input onChange={this.handleFormChange} type='text' name='username' value={this.state.username}/></p>
                <p><label>Password:</label>
                <input onChange={this.handleFormChange} type='password' name='password' value={this.state.password} /></p>
                <input type='submit' value='Log In' />
            </form>


            </div>
        )
    }


}