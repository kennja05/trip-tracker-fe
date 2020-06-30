import React from 'react'
import {Link} from 'react-router-dom'
export default class NavBar extends React.Component {
    
    handleLogout = () => {
        this.props.logout()
        window.location = '/'
    }
    
    render(){
        const {user} = this.props
        return(
            <div className='navbar'>
                {user && <span className='nav-link'>{user.username} </span>} 
                {user ? <span onClick={this.handleLogout} className='nav-link'>Logout</span> : 
                    <Link className='nav-link' to='/'>Login</Link>}
                <Link className='nav-link' to='/dashboard'>Dashboard</Link>
            </div>
        )
    }
}