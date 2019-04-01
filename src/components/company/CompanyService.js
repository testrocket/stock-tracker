const COMPANIES_KEY = 'stock-tracker-companies';

export default class CompanyService {

  static loadCompanies() {
    return JSON.parse(localStorage.getItem(COMPANIES_KEY)) || [];
  }

  static addCompany(company) {
    let companies = CompanyService.loadCompanies();
    companies.push(company);

    localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
  }

  static removeCompany(company) {
    let companies = CompanyService.loadCompanies()
      .filter(c => c.symbol !== company.symbol);

    localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
  }
}