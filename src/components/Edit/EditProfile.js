import React from 'react'
import ReactLoading from 'react-loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {Form, Button} from 'react-bootstrap'


export default class EditProfile extends React.Component {

    state = {
        fetchedUser: {},
        loaded: false,
        error: '',
        showForm: false,
        newUsername: '',
        newPhone: '',
        currPassword: '',
        newPassword: ''
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
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(u => this.setState({
            fetchedUser: u,
            newUsername: ''
        }))
    }

    render(){
        const {user} = this.props
        const {fetchedUser, loaded, error, showForm, newUsername} = this.state
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
                    <div>
                        <div className='edit-profile-form'>
                            <h2>Update Profile</h2>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Row>
                                    <Form.Label>New Username: </Form.Label>
                                    <Form.Control onChange={this.handleFormChange} 
                                    name='newUsername' value={newUsername} type='text'></Form.Control>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label>Update Phone: </Form.Label>
                                    <Form.Control type='text'></Form.Control>
                                </Form.Row>
                                <Form.Row>
                                    <Button variant='primary' type='submit'>Submit</Button>
                                </Form.Row>
                            </Form>
                        </div> 
                        <div className='edit-profile-form'>
                            <h2>Update Password</h2>
                            <Form>
                                <Form.Row>
                                    <Form.Label>Current Password: </Form.Label>
                                    <Form.Control type='password' placeholder='Enter Current Password'></Form.Control>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label>New Password: </Form.Label>
                                    <Form.Control type='password' placeholder='Enter New Password'></Form.Control>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label>Confirm New Password: </Form.Label>
                                    <Form.Control type='password' placeholder='Re-type New Password'></Form.Control>
                                </Form.Row>
                                <Form.Row>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </Form.Row>
                            </Form>
                        </div>
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