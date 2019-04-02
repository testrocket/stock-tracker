import React from 'react';
import './QuoteChange.css';

export default class QuoteChange extends React.Component {

  renderQuoteChangeArrow() {
    if (this.props.change < 0) {
      return <span className="quote-change-low">{this.props.change} ({this.props.changePercent}) &#8681;</span>;
    }
    return <span className="quote-change-high">+{this.props.change} (+{this.props.changePercent}) &#8679;</span>
  }

  render() {
    return (
      <div className="quote-change">
        {this.renderQuoteChangeArrow()}
      </div>
    )
  }
}