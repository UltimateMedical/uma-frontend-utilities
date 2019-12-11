export default function(value:string|number|boolean|undefined) {
  if(
    value === 'undefined' || value === null || 
    value === 0 || value === false || value === '' ||
    typeof value === 'undefined'
  ) {
    return true;
  }
  return false;
}