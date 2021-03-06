import React, { Component } from 'react'
import Suggestions from './Suggestions';
import './Search.css'
import { debounce } from 'lodash';
import CompanyService from '../../services/CompanyService';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      suggestions: []
    };

    this.handleInputChangeDounced = debounce(this.handleInputChange, 200);
  }

  search() {
    CompanyService.searchCompany(this.state.query)
      .then((suggestions) => {
        this.setState({
          suggestions: suggestions.bestMatches
        })
      }).catch(error => console.log('Failed to fetch company: ', { error }));
  }

  handleInputChange() {
    this.setState({
      query: this.inputField.value || ''
    }, () => {
      if (this.state.query.length) {
        this.search();
      }
    })
  }

  render() {
    return (
      <div className="search">
        <div className="search-title">Track New Company</div>
        <div className="search-symbol">Company symbol</div>
        <div>
          <input
            placeholder="Company symbol"
            ref={input => this.inputField = input}
            onChange={() => this.handleInputChangeDounced()}
            spellCheck="false"
          />
        </div>
        <div>Provide the stock exchange symbol of a company you want to track</div>
        <Suggestions suggestions={this.state.suggestions} suggestionSelected={this.props.suggestionSelected} />
      </div>
    )
  }
}

export default Search
