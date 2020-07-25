import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignInAlt, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'

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
        const {username, password} = this.state
        return(
            <div className='login-form-div'>
                <h2>Returning User? Log in below <span data-tip="Don't want to create an account? 
                Try logging in with with username: 12345, and password: 123">
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    <ReactTooltip />
                </span>
                </h2>
                <div className='login-form'>
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            <label>Username: </label>
                            <input onChange={this.handleFormChange} type='text' name='username' 
                                value={username}/>
                        </p>
                        <p>
                            <label>Password: </label>
                            <input onChange={this.handleFormChange} type='password' name='password' 
                                value={password} />
                        </p>
                        <button disabled={password === "" || username === ""} type='submit'>
                            <FontAwesomeIcon aria-hidden={true} icon={faSignInAlt} />
                            <span className='sr-only'>Log In</span>
                        </button>
                    </form>
                </div>
            </div>
        )   
    }
}