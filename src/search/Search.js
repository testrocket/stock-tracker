import React, { Component } from 'react'
import Suggestions from './Suggestions';
import './Search.css'
import { debounce } from 'lodash';

const API_KEY = 'blah';

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
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.query}&apikey=${API_KEY}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((results) => {
        this.setState({
          results: results.bestMatches
        })
      });
  }

  handleInputChange() {
    this.setState({
      query: this.inputField.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
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
