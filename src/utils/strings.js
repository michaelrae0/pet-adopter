const addSearchParams = (arr, isStart = false) => {
  let result = ''

  for (let i = 0; i < arr.length; i = i + 2) {
    if (arr[i+1] === '') continue;

    result += (isStart ? '?' : '&') + `${arr[i]}=${arr[i+1]}`
    isStart = false;
  }
  return result
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
  addSearchParams,
  removeParentheses,
  encodeURI,
}