import React, { Component } from 'react';
import './App.css';
import Companies from './components/company/Companies';

const companies = [
  {
    name: 'Google',
    symbol: 'GOOG',
    price: '100.0 USD',
    country: 'United States',
    marketOpen: "09:30",
    marketClose: "16:00",
    timezone: "UTC-04",
    currency: "USD",
    logo: 'https://logo.clearbit.com/abc.xyz'
  },
  {
    name: 'Microsoft',
    symbol: 'MSFT',
    price: '110.0 USD',
    country: 'United States',
    marketOpen: "09:30",
    marketClose: "16:00",
    timezone: "UTC-04",
    currency: "USD",
    logo: 'https://logo.clearbit.com/microsoft.com'
  },
  { 
    name: 'Amazon',
    symbol: 'AMZN',
    price: '190.0 USD',
    country: 'United States',
    marketOpen: "09:30",
    marketClose: "16:00",
    timezone: "UTC-04",
    currency: "USD",
    logo: 'https://logo.clearbit.com/amazon.com'
  },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Companies companies={companies}/>
      </div>
    );
  }
}

export default App;
