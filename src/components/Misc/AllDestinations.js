import React from 'react'
import ReactLoading from 'react-loading'
export default class AllDestinations extends React.Component {

    state = {
        destinations: [],
        searchTerm: "",
        loaded: false,
    }

    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/destinations/top/all`)
            .then(resp => resp.json())
            .then(destArray => this.setState({
                destinations: destArray,
                loaded:true
            }))
    }

    handleSearch = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render(){
        const rates = this.props.rates[1]
        const {loaded, searchTerm, destinations} = this.state
        return( 
            <div className='all-dest'>
                <div className='all-destinations-list'>
                    <h1 style={{fontFamily: 'Racing Sans One'}}>Available Destinations</h1> 
                    {!loaded && <ReactLoading height={'20%'} width={'20%'} 
                        type={'cylon'} color={'#6b6e70'}/>}              
                    {loaded && 
                    <div>
                        <p><u>Search for a Country: </u>
                        <input onChange={this.handleSearch} type='text' 
                            value={searchTerm} name='searchTerm'/></p>
                    </div>}
                    <ul>
                        {destinations.filter(dest => 
                        dest.name.includes(searchTerm.toUpperCase())).map((destination, index) => 
                            <li className={index % 2 === 0 ? 'all-countries-li-gray' : 'all-countries-li-green'} 
                                key={destination.id}>
                            <b>{destination.name}</b> (Local Name: {destination.native_name})
                                <ul>
                                    <li><u>Capital</u>: {destination.capital}</li>
                                    <li><u>Currency Code/Symbol</u>: 
                                    {' ' + destination.currency_name} / {destination.code} 
                                    ({destination.symbol})
                                    </li>
                                    <li><u>Exchange Rate</u>: 
                                    {` ${rates.rate_list.rates[destination.code]} ${destination.code} : $1 USD`}
                                    </li>
                                </ul>
                        </li>)}
                    </ul>
                </div>
            </div>
        ) 
    }
}