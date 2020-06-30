import React from 'react'
import {Link} from 'react-router-dom'

class PleaseLogin extends React.Component {
    
    state = {
        location: undefined,
        message: undefined
    }

    componentDidMount(){
        switch(this.props.location){
            case 'past' :
                this.setState({
                    location: 'Past Trips',
                    message: 'Please log in to see your past trips'
                })
                break;
            case 'present' :
                this.setState({
                    location: 'Upcoming Trips',
                    message: 'Please log in to see your upcoming trips'
                })
                break;
            case 'add' :
                this.setState({
                    location: 'Add a New Trip',
                    message: 'Please log in to add new trips'
                })
                break;
            default :
                console.log('Message me how you got here lol. github: kennja05')    
        }
    }

    
    render(){
            return(
                <div className='dashboard-container'>
                        <div className='sub-dash-container-div'>
                        <h2><u>{this.state.location}</u></h2>
                            <Link className='link' to='/'><b>{this.state.message}</b></Link>
                        </div>
                </div>
            )        
    }
}

export default PleaseLogin