import React, { Component } from 'react';
import './App.css';
import Companies from './components/company/Companies';
import Search from './components/search/Search';
import CompanyService from './services/CompanyService';
import CompanyStorageService from './services/CompanyStorageService';
import StockTrackingService from './services/StockTrackingService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      trackNewCompany: true,
    };

    this.suggestionSelected = this.suggestionSelected.bind(this);
    this.removeCompany = this.removeCompany.bind(this);
  }

  componentDidMount() {
    StockTrackingService.update()
      .then(companies => {
        this.setState({
          companies
        })
      });
  }

  suggestionSelected = (companySuggestion) => {
    CompanyService.createCompany(companySuggestion)
      .then(company => {
        CompanyStorageService.addCompany(company);
        return StockTrackingService.update();
      })
      .then(companies => {
        this.setState({
          companies,
          trackNewCompany: false,
        })
      });
  }

  removeCompany(company) {
    CompanyStorageService.removeCompany(company);

    StockTrackingService.update()
      .then(companies => {
        this.setState({
          companies
        });
      });
  }

  renderContent() {
    if (this.state.trackNewCompany) {
      return <Search suggestionSelected={this.suggestionSelected} />;
    }
    return <Companies companies={this.state.companies} removeCompany={this.removeCompany} />;
  }

  tabs(index) {
    this.setState({
      trackNewCompany: index === 0
    })
  }

  render() {
    return (
      <div className="container">
        <div className="container-header">
          <div>Stock Tracker </div>
          <div>
            <a href="#" onClick={() => this.tabs(0)}>Track New Company</a>
            <a href="#" onClick={() => this.tabs(1)}>Companies</a>
          </div>
        </div>
        <div className="container-body">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default App;
