const COMPANIES_KEY = 'stock-tracker-companies';

export default {

  loadCompanies() {
    return JSON.parse(localStorage.getItem(COMPANIES_KEY)) || [];
  },

  addCompany(company) {
    let companies = this.loadCompanies();
    companies.push(company);

    localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
  },

  removeCompany(company) {
    let companies = this.loadCompanies()
      .filter(c => c.symbol !== company.symbol);

    localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
  }
}