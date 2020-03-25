import React from 'react'

export default class NavBar extends React.Component {
    
    handleLogout = () => {
        this.props.logout()
        this.props.history.push('/')
    }

    handleLogin = () => {
        this.props.history.push('/')
    }

    handleDashboardClick = () => {
        this.props.history.push('/dashboard')
    }
    
    render(){
        return(
            <div className='navbar'>
                <span className='link' onClick={this.handleDashboardClick}>Dashboard</span> {this.props.user ? <span className='link' onClick={this.handleLogout}>Logout</span> : <span className='link' onClick={this.handleLogin}>Log In</span>}
            </div>
        )
    }
}