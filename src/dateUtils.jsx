const DATE_SEPARATOR = ".";

function zeroPadding(n) {
  return n < 10 ? '0'+n : n.toString();
}

function toShortDate(date) {
  const day = zeroPadding(date.getDate());
  const month = zeroPadding(date.getMonth() + 1);
  return [day, month, date.getFullYear()].join(DATE_SEPARATOR);
}

function fromShortDate(dateString) {
  let [day, month, year] = dateString.split(DATE_SEPARATOR).map( (n)=>parseInt(n,10) );
  month = month-1;
  if(day > 31 || month > 11 || year < 1000) {
    return null;
  }
  var date = new Date(year, month, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

export {DATE_SEPARATOR, toShortDate, fromShortDate};
