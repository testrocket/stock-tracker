import React, { Component } from 'react';
import './App.css';
import Companies from './components/company/Companies';
import Search from './search/Search';
import CompanyService from './components/company/CompanyService';
import LogoService from './search/LogoService';
import { first } from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: CompanyService.loadCompanies()
    };

    this.suggestionSelected = this.suggestionSelected.bind(this);
    this.removeCompany = this.removeCompany.bind(this);
  }

  suggestionSelected = (company) => {
    LogoService.loadLogo(company['2. name']).then(logoData => {
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
        price: 100
      });

      this.setState({
        companies: CompanyService.loadCompanies()
      });
    });
  }

  removeCompany(company) {
    CompanyService.removeCompany(company);

    this.setState({
      companies: CompanyService.loadCompanies()
    });
  }

  render() {
    return (
      <div className="App">
        <Companies companies={this.state.companies} removeCompany={this.removeCompany} />
        <Search suggestionSelected={this.suggestionSelected} />
      </div>
    );
  }
}

export default App;
