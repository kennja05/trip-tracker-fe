import React from 'react'

export default class EditProfile extends React.Component {

    render(){
        const {user} = this.props
        console.log(user)
        return(
            <div id='edit-profile-page'>
                <div id='edit-form'>
        <h1>{this.props.user ? user.username : "Log in son"}</h1>
                </div>
            </div>
        )
    }


}