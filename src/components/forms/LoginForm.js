import React from 'react'

export default class LoginForm extends React.Component {

    state = {
        username: '',
        password: '',
        users: [],
        loaded: false
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/users')
            .then(resp => resp.json())
            .then(userArray => this.setState({users: userArray, loaded: true}))
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
            const inputUser = {username, password}
            const foundUser = this.state.users.find(user => user.username === inputUser.username)
            if (foundUser && foundUser.password === inputUser.password) {
                this.props.routerProps.history.push('/dashboard')
                this.props.handleLogin(foundUser)
            } else {
                alert('No Record Found Using Input Information')
            }
        } else {
            alert('Please complete both fields')
        }
    }


    render(){
        console.log(this.props)
            return(
                <div className='credential-form'>
                    <h2>Returning User? Log In </h2>
                <form onSubmit={this.handleSubmit}>
                    <p><label>Username:</label>
                    <input onChange={this.handleFormChange} type='text' name='username' value={this.state.username}/></p>
                    <p><label>Password:</label>
                    <input onChange={this.handleFormChange} type='password' name='password' value={this.state.password} /></p>
                    {this.state.loaded && <input type='submit' value='Log In' />}
                </form>
    
    
                </div>
            )
        
    }


}