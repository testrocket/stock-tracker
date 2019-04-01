import React from 'react'
import './Suggestions.css';

const Suggestions = (props) => {
  const options = props.results.map((r, index) => (
    <li key={index} onClick={() => props.suggestionSelected(r)}>
      {r['2. name']}
    </li>
  ))
  return <ul className="suggestions-list">{options}</ul>
}

export default Suggestions
