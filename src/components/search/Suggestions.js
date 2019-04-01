import React from 'react'
import './Suggestions.css';

const Suggestions = (props) => {
  const options = props.suggestions.map((suggestion, index) => (
    <li key={index} onClick={() => props.suggestionSelected(suggestion)}>
      <button className="track-button">Track</button> {suggestion['2. name']}
    </li>
  ));
  return <ul className="suggestions-list">{options}</ul>;
}

export default Suggestions
