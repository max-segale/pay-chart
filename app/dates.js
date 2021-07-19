export function datePeriods(start, end, interval) {
  const periods = [];
  const first = new Date(start.valueOf());
  const last = new Date(end.valueOf());
  let fnName = null;

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

  const getFn = 'getUTC' + fnName;
  const setFn = 'setUTC' + fnName;

  while (first < last) {
    periods.push(new Date(first.valueOf()));
    first[setFn](first[getFn]() + 1);
  }

  return periods;
}