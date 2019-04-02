import React, { Component } from 'react';
import './App.css';
import Companies from './components/company/Companies';
import Search from './components/search/Search';
import CompanyStorageService from './services/CompanyStorageService';
import LogoService from './services/LogoService';
import CompanySearchService from './services/CompanySearchService';
import { get, first, last, words, mapKeys } from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    const companies = CompanyStorageService.loadCompanies();
    this.state = {
      companies: CompanyStorageService.loadCompanies(),
      trackNewCompany: true,
    };

    this.suggestionSelected = this.suggestionSelected.bind(this);
    this.removeCompany = this.removeCompany.bind(this);
  }

  suggestionSelected = (companySuggestion) => {
    const logoName = first(words(companySuggestion['2. name']))
    const promises = [
      CompanySearchService.globalQuote(companySuggestion['1. symbol']),
      LogoService.loadLogo(logoName),
    ];

    Promise.all(promises).then(results => {
      const company = this.createCompany(companySuggestion, ...results);

      CompanyStorageService.addCompany(company);

      this.setState({
        companies: CompanyStorageService.loadCompanies(),
        trackNewCompany: false
      });
    })
  }

  createCompany(companySuggestion, quote, logoData) {
    const keyExtractor = (value, key) => last(words(key)).toLowerCase();

    let company = mapKeys(companySuggestion, keyExtractor);
    company.quote = mapKeys(quote['Global Quote'], keyExtractor);
    company.logo = get(logoData, '[0].logo');
    return company;
  }

  removeCompany(company) {
    CompanyStorageService.removeCompany(company);

    this.setState({
      companies: CompanyStorageService.loadCompanies()
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
