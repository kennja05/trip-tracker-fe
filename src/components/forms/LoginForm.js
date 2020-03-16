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

    render(){
        return(
            <div>
                <h2>Returning User? Log In </h2>
            <form>
                <label>Username:</label>
                <input onChange={this.handleFormChange} type='text' name='username' value={this.state.username}/>
                <label>Password:</label>
                <input onChange={this.handleFormChange} type='password' name='password' value={this.state.password} />
                <input type='submit' value='Log In' />
            </form>


            </div>
        )
    }


}