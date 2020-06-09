import React from 'react'

export default class LoginForm extends React.Component {

    state = {
        username: '',
        password: '',
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {username, password} = this.state
        fetch(`http://localhost:3000/api/v1/users/login/${username}/${password}`)
            .then(resp => resp.json())
            .then(user => user ? this.props.handleLogin(user) : alert('No user was found. Please try again.'))
    }

    componentWillUnmount(){
        this.setState({
            username: '',
            password: ''
        })
    }



    render(){
        return(
            <div className='login-form-div'>
            <form className='login-form' onSubmit={this.handleSubmit}>
                <p>
                    <label>Username:</label>
                    <input onChange={this.handleFormChange} type='text' name='username' 
                        value={this.state.username}/>
                </p>
                <p>
                    <label>Password:</label>
                    <input onChange={this.handleFormChange} type='password' name='password' 
                        value={this.state.password} />
                </p>
                <input type='submit' value='Log In' />
            </form>
            </div>
        )   
    }
}