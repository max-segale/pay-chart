export class Paystub {
  constructor() {
    this.type = null;
    this.company = null;
    this.date = null;
    this.amount = null;
    this.hours = null;
  }

  addType(id) {
    switch(id) {
      case '3022647439':
        this.type = 'robert_half';
        break;
      case '3660856':
        this.type = 'insperity';
        break;
    }
  }

  addCompany(company) {
    switch(company) {
      case 'Cure':
        this.company = 'FCBCure';
        break;
      case 'LIFETIME':
        this.company = 'LTV';
        break;
      default:
        this.company = company;
    }
  }

  addDate(date) {
    this.date = new Date(date);
  }

  addAmount(amount) {
    this.amount = parseFloat(amount.replace(/,/g, ''));
  }

  addHours(hours) {
    this.hours = parseFloat(hours);
  }
}
