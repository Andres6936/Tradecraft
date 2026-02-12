// Ref: https://stackoverflow.com/a/48100007
const toTruncate = (number: number, digits: number) =>
  Math.trunc(number * Math.pow(10, digits)) / Math.pow(10, digits);

export {toTruncate}
