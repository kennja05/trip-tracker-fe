import React from 'react';
import './App.css';
import Credentials from './components/Credentials'
import TripContainer from './components/TripContainer'
import CurrencyContainer from './components/TripContainer'
import PopularDestinationsContainer from './components/PopularDestinationsContainer'


function App() {
  return (
    <div className="App">
      <Credentials />
      <TripContainer />
      <CurrencyContainer />
      <PopularDestinationsContainer />
    </div>
  );
}

export default App;
