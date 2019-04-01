import React, { Component } from 'react';
import './App.css';
import Companies from './components/company/Companies';
import Search from './components/search/Search';
import CompanyStorageService from './services/CompanyStorageService';
import LogoService from './services/LogoService';
import CompanySearchService from './components/search/CompanySearchService';
import { get, first, words } from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: CompanyStorageService.loadCompanies(),
      trackNewCompany: true,
    };

    this.suggestionSelected = this.suggestionSelected.bind(this);
    this.removeCompany = this.removeCompany.bind(this);
  }

  suggestionSelected = (company) => {
    const logoName = first(words(company['2. name']))
    const promises = [
      CompanySearchService.globalQuote(company['1. symbol']),
      LogoService.loadLogo(logoName),
    ];

    Promise.all(promises).then(results => {
      const quote = results[0];
      const logoData = results[1];
      const firstLogoData = first(logoData);

      CompanyStorageService.addCompany({
        logo: firstLogoData ? firstLogoData.logo : '',
        symbol: company['1. symbol'],
        name: company['2. name'],
        type: company['3. type'],
        region: company['4. region'],
        marketOpen: company['5. marketOpen'],
        marketClose: company['6. marketClose'],
        timezone: company['7. timezone'],
        currency: company['8. currency'],
        price: get(quote, ['Global Quote', '05. price']),
        latestTradingDay: get(quote, ['Global Quote', '07. latest trading day']),
        change: get(quote, ['Global Quote', '09. change']),
        changePercent: get(quote, ['Global Quote', '10. change percent']),
      });

      this.setState({
        companies: CompanyStorageService.loadCompanies(),
        trackNewCompany: false
      });
    })
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
