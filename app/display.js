export function payDisplay(payDates, dateFormat) {
  const dateOptions = { 
    year: 'numeric',
  };
  if (dateFormat === 'month') {
    dateOptions.month = 'short';
  }
  const date = new Intl.DateTimeFormat('en-US', dateOptions);
  const dollars = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  let totalPay = 0;
  payDates.forEach((datePay) => {
    let displayDate = '';
    let pay = 0;
    displayDate = date.format(datePay.date);
    for (let p = 0; p < datePay.pay.length; p++) {

      pay += datePay.pay[p].amount;
    }
    console.log(displayDate, dollars.format(pay));
    totalPay += pay;
  });
  console.log(dollars.format(totalPay));
}