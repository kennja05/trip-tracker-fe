import React from 'react'

export default class LoginForm extends React.Component {

    render(){
        return(
            <form>
                <label>username</label>
                <input type='text' name='username'/>
            </form>
        )
    }


}