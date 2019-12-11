/**
 * Determine if a given value is falsy.<br>
 * i.e `null`, `0`, `false`, `''`, `undefined`, `'undefined'`, `NaN`
 * 
 * @param {any} value - The value to be evaluated.
 * @return {boolean} - `true` if falsy. `false` otherwise.
 */
export default function isFalsy(value:any):boolean {
  if(
    value === null      || value === 0           || 
    value === false     || value === ''          ||
    value === undefined || value === 'undefined' ||
    Number.isNaN(value)
  ) {
    return true;
  }
  return false;
}