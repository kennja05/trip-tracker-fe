import React from 'react'

class PopularDestinationsContainer extends React.Component {

    state = {
        topDestinations: []
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/destinations/top')
            .then(res => res.json())
            .then(topDestinations => this.setState({topDestinations}))
    }


    render(){
        console.log(this.state)
        return(
            <div className='Sub-Container'>
                <h2>Top 5 Destinations</h2>
                <ol>
                {this.state.topDestinations.map(dest => <li key={dest.id}>{dest.name} - {dest.trips.length} have gone here</li>)}  
                </ol>
            </div>
        )
    }


}

export default PopularDestinationsContainer