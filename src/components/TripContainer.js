import React from 'react'

export default class TripContainer extends React.Component {

    state = {
        myTrips: [],
        loaded: false,
        startIndex: 0
    }


    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/trips`)
            .then(res => res.json())
            .then(userTrips => this.setState({
                myTrips: userTrips,
                loaded: true
            }))
    }

    handleNextClick = () => {
        if (this.state.startIndex < this.state.myTrips.length) {
            this.setState({
                startIndex: this.state.startIndex + 5
            })
        }
    }

    handlePrevClick = () => {
        if (this.state.startIndex >=5) {
            this.setState({
                startIndex: this.state.startIndex - 5
            })
        } else {
            this.setState({
                startIndex: 0
            })
        }
    }

    render(){
        console.log(this.state)
        return (
            <div className='Sub-Container'>
                <h2>My Trips</h2> 
                <ul className='list'>
                    {this.state.myTrips.slice(this.state.startIndex, this.state.startIndex + 5).map(trip => <li key={trip.id}><b>{trip.destination.name}</b>
                    <ul><li>
                        <u>{trip.start_date}</u> - <u>{trip.end_date}</u>
                        </li></ul>
                    </li>)}
                </ul>
                <button onClick={this.handlePrevClick}><span id='prev' role='img' aria-label='arrow'>⬅️</span></button><button onClick={this.handleNextClick}><span role='img' aria-label='arrow'>➡️</span></button>
            </div>
        )
    }


}