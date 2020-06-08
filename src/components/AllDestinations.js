import React from 'react'
import ReactLoading from 'react-loading'
export default class AllDestinations extends React.Component {

    state = {
        destinations: [],
        searchTerm: "",
        loaded: false,
        startIndex: 0
    }

    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/destinations/top/all/${this.state.startIndex}`)
            .then(resp => resp.json())
            .then(destArray => this.setState({
                destinations: destArray,
                loaded:true
            }))
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.startIndex !== this.state.startIndex){
            this.setState({
                loaded: false
            })
            fetch(`http://localhost:3000/api/v1/destinations/top/all/${this.state.startIndex}`)
            .then(resp => resp.json())
            .then(destArray => this.setState({
                destinations: destArray,
                loaded:true
            }))
        }
    }

    handleSearch = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChangeIndex = e => {
        if (e.target.name === 'increment') {
            if (this.state.startIndex < 200){
                this.setState({
                    startIndex: this.state.startIndex + 50
                })
            } else {
                alert("You have reached the end of the list!")
            }
        }
        if (e.target.name === 'decrement') {
            if (this.state.startIndex >= 50){
                this.setState({
                    startIndex: this.state.startIndex - 50
                })
            } else {
                alert("You are already at the beginning of the list!")
            }
        }
    }

    // <ReactLoading type={'spin'} color={'#6b6e70'}/>

    render(){
        console.log(this.state.startIndex)
        return( 
            <div className='all-dest'>
                <div className='all-destinations-list'>
                    <h2>All Destinations: {this.state.startIndex} - {this.state.startIndex + 50} </h2>               
                    {this.state.loaded && 
                    <div>
                        <p><u>Search for a Country: </u>
                        <input onChange={this.handleSearch} type='text' value={this.state.searchTerm} name='searchTerm'/></p>
                    </div>}
                    <ul>
                        {this.state.destinations.filter(dest => dest.name.includes(this.state.searchTerm.toUpperCase())).map((destination, index) => <li className={index % 2 === 0 ? 'all-countries-li-gray' : 'all-countries-li-green'} key={destination.id}>
                            <b>{destination.name}</b> (Local Name: {destination.native_name})
                                <ul>
                                    <li><u>Capital</u>: {destination.capital}</li>
                                    <li><u>Trips Planned To Here By Site Users</u>: {destination.trips.length}</li>
                                    <li><u>Currency Code/Symbol</u>: {destination.currency_name} / {destination.code} ({destination.symbol})</li>
                                    <ul>
                                        <li>Current Exchange Rate: {destination.values.slice(-1).pop().rate} {destination.code} : $1 USD</li>
                                    </ul>
                                </ul>
                        </li>)}
                    </ul>
                </div>
                <button name='increment' onClick={this.handleChangeIndex}>Increase Index</button>
                <button name='decrement' onClick={this.handleChangeIndex}>Decrease Index</button>
            </div>
        ) 
    }



}