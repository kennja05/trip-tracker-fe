import React from 'react'

export default class TripContainer extends React.Component {


    componentDidMount(){
        fetch('http://localhost:3000/api/v1/trips')
    }

    render(){
        return (
            <div className='container'>
                <ol className='list'>
                {/* gonna do all of our little trippies here */}
                </ol>
            </div>
        )
    }



}