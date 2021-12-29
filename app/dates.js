export function datePeriods(start, end, interval) {
  const periods = [];
  const first = new Date(start);
  const last = new Date(end);
  let i = 1;
  let fnName = null;
  // Set beginning of first period and date function name
  first.setHours(0);
  if (interval === 'year' || interval === 'month') {
    first.setDate(1);
  }
  if (interval === 'year') {
    fnName = 'FullYear';
    first.setMonth(0);
  } else if (interval === 'month') {
    fnName = 'Month';
  } else if (interval === 'week') {
    fnName = 'Date';
    i = 7;
  }
  // Dynamic function names for date iteration
  const getFn = 'get' + fnName;
  const setFn = 'set' + fnName;
  while (first < last) {
    periods.push(new Date(first.valueOf()));
    // Move to next period
    first[setFn](first[getFn]() + i);
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
      if (paystubs[s].date >= payPeriods[p] &&
        (paystubs[s].date < payPeriods[p + 1] || p === payPeriods.length - 1)) {
        datePay.pay.push(paystubs[s]);
      }
    }
    payDates.push(datePay);
  }
  return payDates;
}
