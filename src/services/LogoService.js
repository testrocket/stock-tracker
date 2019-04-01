export default {
  loadLogo(name) {
    const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`;
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