import React from 'react'
import classnames from 'classnames'

import * as bar from './searchBar.module.scss'
import { breedsTrieClient, typesTrieClient } from '../../utils/tries'
import { removeParentheses, encodeURI } from '../../utils/strings'

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      tempValue: '',
      breedSuggestions: [],
      typeSuggestions: [],
      selectedBreed: {},
      isBarActive: false,
    }
  }

  componentDidMount() {
    window.addEventListener('click', e => this.setState({ isBarActive: false }));
  }

  componentWillUnmount() {
    window.removeEventListener('click', e => this.setState({ isBarActive: false }));
  }

  trieRequest = (str, client) => {
    const trieResults = client.startsWith(str);

    // flattens breeds of multiple types (ex. Abyssian - cat and bird)
    let flatBreeds = [];
    trieResults.forEach( elem => {
      if (elem.types.length > 1) {
        elem.types.forEach( type => {
          flatBreeds.push({
            breed: `${elem.breed} (${type})`,
            type: type,
          })
        })
      } else {
        flatBreeds.push({
          breed: elem.breed,
          type: elem.types[0],
        })
      }
    })

    return flatBreeds;
  }

  handleMouseOver = (str = '') => {
    this.setState({
      tempValue: str,
    })
  }

  handleChange = e => {
    const flatTypes = this.trieRequest(e.target.value, typesTrieClient)
    const flatBreeds = this.trieRequest(e.target.value, breedsTrieClient)

    this.setState({
      searchValue: e.target.value,
      typeSuggestions: flatTypes,
      breedSuggestions: flatBreeds.slice(0, 7),
      selectedBreed: flatBreeds.length === 1 ? flatBreeds[0] : {},
    });
  }

  handleBarClick = e => {
    const flatTypes = this.trieRequest(e.target.value, typesTrieClient)
    const flatBreeds = this.trieRequest(e.target.value, breedsTrieClient)

    this.setState({
      isBarActive: true,
      typeSuggestions: flatTypes,
      breedSuggestions: flatBreeds.slice(0, 7),
    })
    e.stopPropagation();
  }

  handleSubmit = (e, node) => {
    const filteredBreed = removeParentheses(node.breed.toLowerCase());
    let location = '/search'

    let breed = filteredBreed[0] || 'all';
    const categorySearch = breed === 'all' || breed === 'dogs' || breed === 'cats' || breed === 'birds' || breed === 'barnyard' || breed === 'rabbits' || breed === 'small & furries' || breed === 'shelters' || breed === 'fish & reptiles' || breed === 'horses'

    let type =  node.type         ? node.type.toLowerCase()            :        // type from node
                filteredBreed[1]  ? filteredBreed[1]                   :        // type from parentheses
                !categorySearch   ? breedsTrieClient.getType(breed)[0] : null;  // retrieve type |OR| type = null b/c its a category search

    if (type) {
      breed = encodeURI(breed)
      type = encodeURI(type);
      location += `/${type}/${breed}`
    }
    else {
      type = encodeURI(breed);
      location += `/${type}`
    }

    window.location.href = location
    e.preventDefault()
  }

  render() {
    const { isFullSized } = this.props;
    const {
      searchValue,
      tempValue,
      breedSuggestions,
      typeSuggestions,
      isBarActive,
    } = this.state;

    const autocompleteCategory = (arr, name) => (
      <div className={classnames(bar.autocomplete_category)}>
        <div 
          className={classnames(bar.autocomplete_title, bar.autocomplete_text_line)}
          text={name}
        >
          {name}
        </div>
        <div
          className={bar.autocomplete_dividing_line}
        />
        <ul className={bar.autocomplete_list} >
          {arr.map( elem => (
            <li
              className={classnames(bar.autocomplete_subtitle, bar.autocomplete_text_line)}
              key={elem.breed}
              onClick={e => this.handleSubmit(e, elem)}
              onMouseEnter={() => this.handleMouseOver(elem.breed)}
              onMouseLeave={() => this.handleMouseOver()}
            >
              {elem.breed}
            </li>
          ))}
        </ul>
      </div>
    )


    return (
      <form
        autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
        className={bar.component}
        onSubmit={e => this.handleSubmit(e, { breed: searchValue, type: null })}
      >

        <input
          type='text' placeholder='Search'
          value={tempValue ? tempValue : searchValue}
          className={classnames(
            bar.input, 
            {[bar.input__full_sized]: isFullSized}, 
            {[bar.input__active]: isBarActive},
          )}
          onClick={this.handleBarClick}
          onChange={this.handleChange}
        />


        {isFullSized &&
        <input
          type='submit' value='Submit'
          className={classnames(bar.submit_btn)}
        />}


        <div
          className={classnames(
            bar.autocomplete,
            {[bar.autocomplete__active]: isBarActive},
            {[bar.autocomplete__full_sized]: isFullSized}
          )}
          onClick={e => e.stopPropagation()}
        >
          {typeSuggestions.length > 0 && autocompleteCategory(typeSuggestions, 'Categories')}
          {breedSuggestions.length > 0 && autocompleteCategory(breedSuggestions, 'Breeds')}
        </div>

      </form>
    )
  }
}