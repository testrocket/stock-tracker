import React from 'react';
import './Company.css';
import QuoteChange from './quote/QuoteChange';
import { isEmpty } from 'lodash';

export default class Company extends React.Component {

  renderCompanyQuote(company) {
    if (isEmpty(company.quote)) {
      return <div className="company-details-row company-details-price"> </div>
    }
    return (
      <div className="company-details-row company-details-price">
        <span>{company.quote.price}</span>
        <span> {company.currency}</span>
        <QuoteChange change={company.quote.change} changePercent={company.quote.percent} />
        <span>Closed: {company.quote.day}</span>
      </div>
    );
  }

  render() {
    const company = this.props.company;
    return (
      <div className="company">
        <div className="company-logo">
          <img src={company.logo} alt={company.name} />
        </div>
        <div className="company-details">
          <div className="company-details-row company-details-name">
            <span>{company.name} </span>
            <span>{company.symbol}</span>
          </div>
          <div className="company-details-row company-details-country">
            <span>{company.region} </span>
            <span>{company.open}</span>
            <span> - </span>
            <span>{company.close} </span>
            <span>{company.timezone}</span>
          </div>
          {this.renderCompanyQuote(company)}
        </div>
        <div>
          <button onClick={() => this.props.removeCompany(company)}>x</button>
        </div>
      </div>
    );
  }
}
