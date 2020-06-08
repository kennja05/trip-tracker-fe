import React from 'react'

export default class NavBar extends React.Component {
    
    handleLogout = () => {
        this.props.logout()
        this.props.history.push('/')
    }
    
    render(){
        return(
            <div className='navbar'>
                <a href='/'>Login Page</a>
            </div>
        )
    }
}