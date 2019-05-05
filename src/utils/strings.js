const toTitleCase = str => {
  const loweredArr = str.trim().toLowerCase().split(" ");
  const titled = loweredArr.map( substr => substr.charAt(0).toUpperCase() + substr.slice(1) );
  return titled.join(' ');
}

const removeParentheses = str => {
  const split = str.trim().split('(')
  if (split.length > 1) split[1] = split[1].slice(0, split[1].length - 1);
  return split;
}

const encodeURI = str => {
  str = str.toLowerCase().trim()

  if ( str === 'small & furries')       return encodeURIComponent('small & furry')
  else if ( str === 'fish & reptiles')  return encodeURIComponent('scales, fins & other')
  else if (
    str === 'dogs'    || 
    str === 'cats'    || 
    str === 'rabbits' || 
    str === 'horses'  || 
    str === 'birds'
  ) return str.slice(0, str.length-1)
  else return encodeURIComponent(str)
}

export {
  toTitleCase,
  removeParentheses,
  encodeURI,
}