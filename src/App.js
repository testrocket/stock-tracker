import React, { Component } from 'react';
import './App.css';
import Companies from './components/company/Companies';

const companies = [
  { name: 'Google', price: '100.0 USD', country: 'USA', logo: 'https://logo.clearbit.com/abc.xyz' },
  { name: 'MSFT', price: '110.0 USD', country: 'USA', logo: 'https://logo.clearbit.com/abc.xyz' },
  { name: 'AMZN', price: '190.0 USD', country: 'USA', logo: 'https://logo.clearbit.com/abc.xyz' },
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
