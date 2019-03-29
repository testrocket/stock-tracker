import React from 'react';
import './Company.css';

export default class Company extends React.Component {

  render() {
    const company = this.props.company;
    return (
      <div className="company">
        <div className="company-logo">
          <img src={company.logo} alt={company.name}/>
        </div>
        <div className="company-details">
          <div className="company-details-row company-details-name">
            <span>{company.name} </span>
            <span>{company.symbol}</span>
          </div>
          <div className="company-details-row company-details-country">
            <span>{company.country} </span>
            <span>{company.marketOpen}</span>
            <span> - </span>
            <span>{company.currency} </span>
            <span>{company.timezone}</span>
          </div>
          <div className="company-details-row company-details-price">{company.price}</div>
        </div>
        <div>
          <button onClick={() => this.props.removeCompany(company)}>x</button>
        </div>
      </div>
    );
  }
}
