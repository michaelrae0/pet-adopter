import allBreeds from './breeds'

class Node {
  constructor(value = '') {
    this.value = value;
    this.types = [];
    this.isEnd = false;
    this.children = {};
  }


  put(name, type) {
    function processRemainder(child, str) {
      if (str.length) child.put(str, type);
      else {
        child.isEnd = true;
        if (child.types.indexOf(type) === -1) child.types.push(type)
      }
    }

    // check if a child
    const currentChildren = Object.keys(this.children);
    const index = currentChildren.indexOf(name.charAt(0));

    if ( index === -1 ) { // not a child
      let newChild = new Node(name.charAt(0))
      this.children[name.charAt(0)] = newChild; // { ..., 'd' = {child} }
      processRemainder(newChild, name.slice(1))
    } 
    else { // child
      let oldChild = this.children[currentChildren[index]]
      processRemainder(oldChild, name.slice(1))
    }
  }


  getChildrenOf(str, history = '') {
    const childrenArr = Object.keys(this.children); // [a, b, c, d, e]
    let result = [];

    const char = str ? str.charAt(0) : null;
    const isCharInChildren = (str && childrenArr.indexOf(char) !== -1); // char exists in children

    // work through str one char at a time until its empty
    // if full str is an end, record it
    if (isCharInChildren) {
      const charNode = this.children[char];
      const deeperChildren = charNode.getChildrenOf(str.slice(1), history + char);

      // records end
      if ( str.length === 1 && charNode.isEnd ) {
        result.push({
          breed: history + str,
          types: charNode.types,
        })
      }

      result = [...result, ...deeperChildren];
    }


    // if char isnt in children, return empty array
    else if (str && !isCharInChildren) {
      return [];
    }


    // DFT - looking for ends
    else if (childrenArr) {
      childrenArr.forEach( (elem, i) => {
        const childNode = this.children[elem];
        // console.log(childNode)
        // record ends
        if (childNode.isEnd) {
          result.push({
            breed: history + childNode.value,
            types: childNode.types,
          }) 
        }

        const deeperChildren = childNode.getChildrenOf(null, history + childNode.value); // recursive call
        if (deeperChildren) result = [...result, ...deeperChildren] // combine results
      })
    }


    // no children - has to be an end
    else {
      result = [{
        breed: history,
        types: this.types,
      }] 
    }

    
    return result;
  }
}
// ------------------------------------


// const testArr = ['car', 'array', 'string', 'arr', 'airplane', 'arrow', 'cat', 'calf', 'calves', 'balloon', 'arrrrrrr', 'ar']

let trie = new Node();
allBreeds.forEach( elem => trie.put(elem.breed, elem.type) )

const breedsTrieClient = {
  startsWith(str) {
    const titleCasedStr = 
      str.toLowerCase()
      .split(' ')
      .map( elem => elem.charAt(0).toUpperCase() + elem.slice(1))
      .join(' ');
    return trie.getChildrenOf(titleCasedStr);
  }
}

export default breedsTrieClient