export function formatDate(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  if (new Date().setHours(0, 0, 0, 0) <= date.getTime()) { // date is in today
    return date.toLocaleTimeString();
  }
  return date.toLocaleDateString();
}

export function formatNumber(number) {
  if (typeof number === 'string') {
    number = parseFloat(number);
  }
  return number.toLocaleString();
}

export function formatNumberShort(number, digitCount) {
  if (typeof number === 'string') {
    number = parseFloat(number);
  }
  if (number < 1e3) {
    return number.toString();
  }
  if (number < 1e6) {
    return `${(number / 1e3).toFixed(digitCount)}K`;
  }
  if (number < 1e9) {
    return `${(number / 1e6).toFixed(digitCount)}M`;
  }
  return `${(number / 1e9).toFixed(digitCount)}B`;
}

export function onChange(e) {
  /* eslint-disable-next-line no-invalid-this */
  this.setState({[e.target.name]: e.target.value});
}

export function onTextareaChange(e) {
  /* eslint-disable-next-line no-invalid-this */
  this.setState({[e.target.name]: e.target.value});
  /* eslint-disable-next-line no-invalid-this */
  this.setState({[e.target.name + 'LineCount']: e.target.value.split('\n').length});
}
