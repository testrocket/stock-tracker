import React from 'react';
import Company from './Company';
import './Companies.css';

export default class Companies extends React.Component {

  companies() {
    return this.props.companies.map((company, index) =>
      <Company key={index} company={company} removeCompany={() => this.props.removeCompany(company)} />
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
