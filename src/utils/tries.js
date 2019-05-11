import allBreeds from './breeds'
import titleCase from 'title-case'

class Node {
  constructor(value = '') {
    this.value = value;
    this.types = [];
    this.isEnd = false;
    this.children = {};
  }


  put(name, type = null) {
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

  getData(str) {
    const childrenArr = Object.keys(this.children);

    // Reached end
    if (str.length === 0 && this.isEnd) return this.types;

    // Keep going
    const char = str ? str.charAt(0) : null;
    const isCharInChildren = (str && childrenArr.indexOf(char) !== -1); // char exists in children

    if (isCharInChildren) {
      const charNode = this.children[char];
      return charNode.getData(str.slice(1))
    }
  }


  getChildrenOf(str, history = '') {
    const childrenArr = Object.keys(this.children); // [a, b, c, d, e]
    let result = [];

    const char = str ? str.charAt(0) : null;
    const isCharInChildren = (str && childrenArr.indexOf(char) !== -1); // char exists in children

    // work through str one char at a time until its empty
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

let typesTrie = new Node();
['All','Dogs', 'Cats', 'Birds', 'Rabbits', 'Small & Furries', 'Fish & Reptiles', 'Horses', 'Barnyard','Shelters']
  .forEach( elem => typesTrie.put(elem) )

let breedsTrie = new Node();
allBreeds.forEach( elem => breedsTrie.put(elem.breed, elem.type) )


const typesTrieClient = {
  startsWith(str) {
    return typesTrie.getChildrenOf(titleCase(str));
  },
}

const breedsTrieClient = {
  startsWith(str) {
    return breedsTrie.getChildrenOf(titleCase(str));
  },
  getType(str) {
    return breedsTrie.getData(titleCase(str))
  }
}

export { breedsTrieClient, typesTrieClient}