import React from 'react';
import Company from './Company';
import './Companies.css';
import { remove } from 'lodash';

export default class Companies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props
    };

    this.removeCompany = this.removeCompany.bind(this);
  }

  removeCompany(company) {
    const companies = this.state.companies;
    remove(companies, c => c.name === company.name);

    this.setState({
      companies
    });
  }

  companies() {
    return this.state.companies.map((company) =>
      <Company key={company.name} company={company} removeCompany={this.removeCompany} />
    );
  }

  render() {
    return (
      <div className="companies">
        <div className="companies-title">Companies</div>
        {this.companies()}
      </div>
    );
  }
}
