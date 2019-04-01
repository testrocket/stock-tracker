import React, { Component } from 'react'
import Suggestions from './Suggestions';
import './Search.css'
import { debounce } from 'lodash';
import CompanySearchService from './CompanySearchService';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: []
    };

    this.handleInputChangeDounced = debounce(this.handleInputChange, 200);
  }

  search() {
    CompanySearchService.searchCompany(this.state.query)
      .then((results) => {
        this.setState({
          results: results.bestMatches
        })
      }).catch(error => console.log('Failed to fetch company: ', {error}));
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
        <form>
          <input
            placeholder="Search for..."
            ref={input => this.inputField = input}
            onChange={() => this.handleInputChangeDounced()}
          />
          <Suggestions results={this.state.results} suggestionSelected={this.props.suggestionSelected} />
        </form>
      </div>
    )
  }
}

export default Search
