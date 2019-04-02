import LogoService from './LogoService';
import { get, first, last, words, mapKeys } from 'lodash';

const API_KEY = 'blah';
const companyKeyExtractor = (value, key) => last(words(key)).toLowerCase();

export default {
  searchCompany(companyName) {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${companyName}&apikey=${API_KEY}`;
    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(Error('error'))
    }).catch(error => {
      return Promise.reject(Error(error.message))
    });
  },

  globalQuote(symbol) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(Error('error'))
    }).catch(error => {
      return Promise.reject(Error(error.message))
    });
  },

  createCompany(companySuggestion) {
    const logoName = first(words(companySuggestion['2. name']));
    return LogoService.loadLogo(logoName)
      .then(logo => {
        return this._createCompany(companySuggestion, logo);
      });
  },

  _createCompany(companySuggestion, logo) {
    let company = mapKeys(companySuggestion, companyKeyExtractor);
    company.logo = get(logo, '[0].logo');
    return company;
  },

  updateQuoteChange(company, quote) {
    company.quote = mapKeys(quote['Global Quote'], companyKeyExtractor);
    return company;
  }
}