import React from 'react'
import ReactLoading from 'react-loading'


export default class EditProfile extends React.Component {

    state = {
        fetchedUser: {},
        loaded: false,
        error: ''
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

    formatCreatedOn = str =>{
        // let date = str.slice(0, 10)
        // return date
    }

    render(){
        const {user} = this.props
        const {fetchedUser, loaded, error} = this.state
        console.log(this.state)
        this.formatCreatedOn(fetchedUser.created_at)
        return(
            loaded ? 
            <div id='edit-profile-page'>
                <div id='edit-form'>
                    <h1>Username: {!error ? fetchedUser.username : error}</h1>
                    <h2>Joined On: {!error ? fetchedUser.created_at.slice(0,10) : error}</h2> 
                    <h2>Trips Planned Through Site: {!error ? fetchedUser.trips.length : error}</h2>             
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