import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons'

export default class LoginForm extends React.Component {

    state = {
        username: '',
        password: '',
        disableButton: true
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {username, password} = this.state
        fetch(`https://trip-tracker-backend.herokuapp.com/api/v1/users/login/${username}/${password}`)
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
                <h2>Returning User? Log in below</h2>
                <div className='login-form'>
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            <label>Username: </label>
                            <input onChange={this.handleFormChange} type='text' name='username' 
                                value={this.state.username}/>
                        </p>
                        <p>
                            <label>Password: </label>
                            <input onChange={this.handleFormChange} type='password' name='password' 
                                value={this.state.password} />
                        </p>
                        <button disabled={this.state.password === "" || this.state.username === ""} type='submit'>
                            <FontAwesomeIcon aria-hidden={true} icon={faSignInAlt} />
                            <span className='sr-only'>Log In</span>
                        </button>
                    </form>
                </div>
            </div>
        )   
    }
}