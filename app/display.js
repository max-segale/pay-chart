export function payDisplay(payDates, dateFormat) {
  // Set date format options
  const dateOptions = { 
    year: 'numeric',
  };
  if (dateFormat === 'month' || dateFormat === 'week') {
    dateOptions.month = 'short';
  }
  if (dateFormat === 'week') {
    dateOptions.day = 'numeric';
  }
  const calendar = new Intl.DateTimeFormat('en-US', dateOptions);
  // Set payment format options
  const dollars = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  // Display total payment amount for date
  payDates.forEach((datePay) => {
    let dateAmount = datePay.pay
      .map((stub) => stub.amount)
      .reduce((total, num) => total + num, 0);
    console.log(
      calendar.format(datePay.date),
      dollars.format(dateAmount)
    );
  });
}
