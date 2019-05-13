import React from 'react'
import classnames from 'classnames'

import * as bar from './searchBar.module.scss'
import { breedsTrieClient, typesTrieClient } from '../../utils/tries'
import { removeParentheses, encodeURI } from '../../utils/strings'
import { H3, H4, H6 } from '../Typography'

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      zipValue: '',
      breedSuggestions: [],
      typeSuggestions: [],
      selectedBreed: {},
      isBarActive: false,
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.closeAutocomplete);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeAutocomplete);
  }

  closeAutocomplete = () => {
    this.setState({ 
      isBarActive: false,
    })
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

  handleZipChange = e => {
    // 1 to 5 digits
    this.setState({
      zipValue: /^\d{0,5}$/.test(e.target.value) ? e.target.value : this.state.zipValue,
    })
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
    const { zipValue } = this.state;
    const filteredZip = /^\d{5}$/.test(zipValue) ? zipValue : 'defaultlocation';
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
      location += `/${type}/${breed}/${filteredZip}`
    }
    else {
      type = encodeURI(breed);
      location += `/${type}/all/${filteredZip}`
    }

    this.props.history.push(location)
    e.preventDefault()
  }

  render() {
    const { isFullSized } = this.props;
    const {
      searchValue,
      zipValue,
      breedSuggestions,
      typeSuggestions,
      isBarActive,
    } = this.state;
    console.log(this.props.history)

    const autocompleteCategory = (arr, name) => (
      <div className={bar.autocomplete__category}>
        <H6 className={bar.autocomplete__title} text={name} />
        <div className={bar.autocomplete__dividing_line}/>
        <ul className={bar.autocomplete__list} >
          {arr.map( elem => (
            <li
              className={classnames(bar.autocomplete__subtitle, bar.autocomplete__text_line)}
              key={elem.breed}
              onClick={e => this.handleSubmit(e, elem)}
              onMouseEnter={() => this.handleMouseOver(elem.breed)}
              onMouseLeave={() => this.handleMouseOver()}
            >
              <H4 text={elem.breed}/>
            </li>
          ))}
        </ul>
      </div>
    )


    return (
      <form
        autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
        className={classnames(bar.form, {[bar.form__full_sized]: isFullSized})}
        onSubmit={e => this.handleSubmit(e, { breed: searchValue, type: null })}
      >

        <input
          type='text' placeholder='Search'
          value={searchValue}
          id={isFullSized ? 'fullBar' : 'smallBar' }
          className={classnames(bar.input, {[bar.input__full_sized]: isFullSized}, {[bar.input__active]: isBarActive})}
          onClick={this.handleBarClick}
          onChange={this.handleChange}
        />

        <div className={classnames(bar.zip__border, {[bar.zip__border__full_sized]: isFullSized})}/>

        <input 
          type='test' placeholder='Zip'
          value={zipValue}
          className={classnames(bar.zip, {[bar.zip__full_sized]: isFullSized}, {[bar.zip__empty]: !zipValue})}
          onChange={this.handleZipChange}
        />


        {isFullSized &&
        <div className={bar.submit__btn} onClick={e => this.handleSubmit(e, { breed: searchValue, type: null })} >
          <H3 className={bar.submit__text} text={'Submit'} />
        </div>}


        <div id={isFullSized ? 'fullAuto' : 'smallAuto'} className={classnames(bar.autocomplete, {[bar.autocomplete__active]: isBarActive}, {[bar.autocomplete__full_sized]: isFullSized})} onClick={e => e.stopPropagation()}>
          {typeSuggestions.length > 0 && autocompleteCategory(typeSuggestions, 'Categories')}
          {breedSuggestions.length > 0 && autocompleteCategory(breedSuggestions, 'Breeds')}
          {!typeSuggestions.length && !breedSuggestions.length &&
          <H6 className={classnames(bar.autocomplete__title, bar.autocomplete__no_match)} text='No Matches'/>}
        </div>

        <input type="submit" className={bar.submit_on_enter} />

      </form>
    )
  }
}