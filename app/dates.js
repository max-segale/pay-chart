export function datePeriods(start, end, interval) {
  const periods = [];
  const first = new Date(start);
  const last = new Date(end);
  let fnName = null;
  // Set beginning of first period
  first.setUTCHours(0);
  if (interval === 'year' || interval === 'month') {
    first.setUTCDate(1);
  }
  if (interval === 'year') {
    first.setUTCMonth(0);
    fnName = 'FullYear';
  } else if (interval === 'month') {
    fnName = 'Month';
  }
  // Dynamic function names for date iteration
  const getFn = 'getUTC' + fnName;
  const setFn = 'setUTC' + fnName;
  while (first < last) {
    periods.push(new Date(first.valueOf()));
    // Move to next period
    first[setFn](first[getFn]() + 1);
  }
  return periods;
}

export function dateMatch(paystubs, payPeriods) {
  const payDates = [];
  for (let p = 0; p < payPeriods.length; p++) {
    let datePay = {
      date: new Date(payPeriods[p].valueOf()),
      pay: [],
    };
    for (let s = 0; s < paystubs.length; s++) {
      // Match paystubs in this pay period
      if (paystubs[s].date > payPeriods[p]
        && (paystubs[s].date < payPeriods[p + 1] || p === payPeriods.length - 1)) {
        datePay.pay.push(paystubs[s]);
      }
    }
    payDates.push(datePay);
  }
  return payDates;
}