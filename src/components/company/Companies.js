import React from 'react';
import Company from './Company';
import './Companies.css';

export default class Companies extends React.Component {

  renderCompanies() {
    if (this.props.companies.length) {
      return this.props.companies.map((company, index) =>
        <Company key={index} company={company} removeCompany={() => this.props.removeCompany(company)} />
      );
    }
    return (
      <div className="companies-empty">There are no companies yet.&nbsp;
        <a href="/">Track your first company.</a>
      </div>);
  }

  render() {
    return (
      <div className="companies">
        <div className="companies-title">Companies</div>
        {this.renderCompanies()}
      </div>
    );
  }
}
