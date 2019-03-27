import React from 'react';
import Company from './Company';
import './Companies.css';

export default class Companies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       ...props
    };
  }

  companies() {
    return this.state.companies.map((company) =>
      <Company key={company.name} company={company}/>
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
