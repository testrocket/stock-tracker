const API_KEY = 'blah';

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
  }
}