import React from 'react'
import ReactLoading from 'react-loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


export default class EditProfile extends React.Component {

    state = {
        fetchedUser: {},
        loaded: false,
        error: '',
        showForm: false,
        newUsername: ''
    }

    componentDidMount(){
        const userId = this.props.match.params.id
        fetch(`http://localhost:3000/api/v1/users/${userId}`)
            .then(res => res.json())
            .then(user => this.setState({
                fetchedUser: !user.error ? user : null, 
                loaded: true,
                error: user.error ? user.error : null
            }))
    }

    handleEditClick = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleFormChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const user = this.props.user
        user.username = this.state.newUsername
        console.log(user)
        fetch(`http://localhost:3000/api/v1/users/${user.id}`,{
            method: "PATCH",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(u => this.setState({
            fetchedUser: u
        }))
    }

    render(){
        const {user} = this.props
        const {fetchedUser, loaded, error, showForm, newUsername} = this.state
        console.log(this.state.newUsername)
        return(
            loaded ? 
            <div id='edit-profile-page'>
                <div id='profile-info'>
                    <h1>Username: {!error ? fetchedUser.username + " " : error} 
                        {user && user.id === fetchedUser.id && 
                        <span id='edit-username-link' onClick={this.handleEditClick}>
                        <FontAwesomeIcon icon={faEdit}/></span>}
                    </h1>
                    <h2>Joined On: {!error ? fetchedUser.created_at.slice(0,10) : error}</h2> 
                    <h2>Trips Planned Through Site: {!error ? fetchedUser.trips.length : error}</h2>             
                </div>
                {showForm &&
                    <div id='edit-profile-form'>
                        <h2>Update Username</h2>
                        <form>
                            <label>New Username: </label>
                            <input onChange={this.handleFormChange} 
                            name='newUsername' value={newUsername} type='text'/>
                            <input onSubmit={this.handleSubmit} type='submit'/>
                        </form>
                    </div>   
                }
            </div>
            :
            <div id='edit-profile-page'>
                {/* <div id='edit-form'> */}
                    <ReactLoading height={'20%'} width={'20%'} type={'cylon'} color={'#cc3a00'}/>
                {/* </div> */}
            </div>
        )
    }


}