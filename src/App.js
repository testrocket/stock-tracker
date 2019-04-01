import React, { Component } from 'react';
import './App.css';
import Companies from './components/company/Companies';
import Search from './search/Search';
import CompanyService from './components/company/CompanyService';
import LogoService from './search/LogoService';
import CompanySearchService from './search/CompanySearchService';
import { get, first } from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: CompanyService.loadCompanies(),
      trackNewCompany: true,
    };

    this.suggestionSelected = this.suggestionSelected.bind(this);
    this.removeCompany = this.removeCompany.bind(this);
  }

  suggestionSelected = (company) => {
    const promises = [LogoService.loadLogo(company['2. name']),
    CompanySearchService.globalQuote(company['1. symbol'])];

    Promise.all(promises).then(results => {
      const logoData = results[0];
      const quote = results[1];
      const firstLogoData = first(logoData);

      CompanyService.addCompany({
        logo: firstLogoData ? firstLogoData.logo : '',
        symbol: company['1. symbol'],
        name: company['2. name'],
        type: company['3. type'],
        region: company['4. region'],
        marketOpen: company['5. marketOpen'],
        marketClose: company['6. marketClose'],
        timezone: company['7. timezone'],
        currency: company['8. currency'],
        price: get(quote, ['Global Quote', '05. price']) || 0
      });

      this.setState({
        companies: CompanyService.loadCompanies(),
        trackNewCompany: false
      });
    })
  }

  removeCompany(company) {
    CompanyService.removeCompany(company);

    this.setState({
      companies: CompanyService.loadCompanies()
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
        <div class="container-body">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default App;
