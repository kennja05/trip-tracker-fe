import React from 'react'
import ReactLoading from 'react-loading'


export default class EditProfile extends React.Component {

    state = {
        fetchedUser: {},
        loaded: false
    }

    componentDidMount(){
        const userId = this.props.match.params.id
        fetch(`http://localhost:3000/api/v1/users/${userId}`)
            .then(res => res.json())
            .then(user => this.setState({
                fetchedUser: user, 
                loaded: true
            }))
    }

    render(){
        const {user} = this.props
        const {fetchedUser, loaded} = this.state
        console.log(this.state.fetchedUser)
        return(
            loaded ? 
            <div id='edit-profile-page'>
                <div id='edit-form'>
                    <h1>Username: {fetchedUser.username}</h1>
                    <h2>Joined On: </h2>
                </div>
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