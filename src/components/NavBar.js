import React from 'react'

export default class NavBar extends React.Component {
    
    handleLogout = () => {
        this.props.logout()
        this.props.history.push('/')
    }

    handleLogin = () => {
        this.props.history.push('/')
    }
    
    render(){
        return(
            <div className='navbar'>
                {this.props.user ? <span className='link' onClick={this.handleLogout}>Logout</span> : <span className='link' onClick={this.handleLogin}>Log In</span>}
            </div>
        )
    }
}