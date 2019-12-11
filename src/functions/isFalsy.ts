export default function(value:any) {
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