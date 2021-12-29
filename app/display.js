//import open from 'open';

export function payDisplay(payDates, dateFormat) {
  let totalAmount = 0;
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
    currency: 'USD',
  });
  // Display total payment amount for date
  payDates.forEach((datePay) => {
    let dateAmount = datePay.pay.
      map((stub) => stub.amount).
      reduce((total, num) => total + num, 0);
    totalAmount += dateAmount;
    console.log(
      calendar.format(datePay.date),
      dollars.format(dateAmount),
    );
  });
  console.log('total ' + dollars.format(totalAmount));

  //open('file:///Users/maxwell/pay-chart/dist/index.html');
}
