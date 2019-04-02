import CompanyService from "./CompanyService";
import CompanyStorageService from "./CompanyStorageService";
import { zip } from 'lodash';

export default {
  update() {
    const companies = CompanyStorageService.loadCompanies();
    const quotesPromises = companies.map(company => CompanyService.globalQuote(company.symbol));

    return Promise.all(quotesPromises).then(quotes => {
      const companiesWithUpdatedQuotes = zip(companies, quotes).map(companyWithQuote => {
        return CompanyService.updateQuoteChange(companyWithQuote[0], companyWithQuote[1]);
      });

      return Promise.resolve(companiesWithUpdatedQuotes);
    }).catch(error => {
      return Promise.reject(Error(error.message));
    });
  }
}