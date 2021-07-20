export function payDisplay(payDates) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  let totalGross = 0;
  payDates.forEach((datePay) => {
    console.log(datePay);
  });
}