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
          <div className="company-details-row company-details-name">{company.name}</div>
          <div className="company-details-row company-details-country">{company.country}</div>
          <div className="company-details-row company-details-price">{company.price}</div>
        </div>
      </div>
    );
  }
}
