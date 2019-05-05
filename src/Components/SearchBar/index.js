import React from 'react'
import classnames from 'classnames'

import * as bar from './searchBar.module.scss'
import breedsTrie from '../../utils/breedsTrie'
import { toTitleCase, encodeURI } from '../../utils/strings'

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      suggestions: [],
      selectedNode: {},
    }
  }

  handleChange = e => {
    const trieResults = breedsTrie.startsWith(e.target.value);

    // flattens breeds of multiple types (ex. Abyssian - cat and bird)
    let flattenedResults = [];
    trieResults.forEach( elem => {
      if (elem.types.length > 1) {
        elem.types.forEach( type => {
          flattenedResults.push({
            breed: `${elem.breed} (${type})`,
            type: type,
          })
        })
      } else {
        flattenedResults.push({
          breed: elem.breed,
          type: elem.types[0],
        })
      }
    })

    this.setState({
      searchValue: e.target.value,
      suggestions: flattenedResults.slice(0, 10),
      selectedNode: flattenedResults.length === 1 ? flattenedResults[0] : {},
    });
  }

  handleSubmit = (e, value, node) => {
    let location = '/search'
    let breed = '';
    let type = '';

    if (value.indexOf('(') >= 0) {
      const splitStr = value.trim().toLowerCase().split('(')
      type = encodeURI(splitStr[1].slice(0, splitStr[1].length - 1));
      breed = encodeURI(splitStr[0])
      location += `/${type}/${breed}`
    }
    else if (!Object.keys(node).length) {
      type = encodeURI(value);
      location += `/${type}`
    }
    else {
      type = encodeURI(node.type);
      breed = encodeURI(node.breed);
      location += `/${type}/${breed}`
    }

    window.location.href = location
    e.preventDefault()
  }

  render() {
    const { searchValue, suggestions, selectedNode } = this.state;
    const { isFullSized } = this.props;
    const startPattern = toTitleCase(searchValue);

    const datalistId = isFullSized ? 'breeds_home' : 'breeds_header'

    return (
      <form 
        className={bar.component}
        onSubmit={e => this.handleSubmit(e, searchValue, selectedNode)} 
        autoComplete="off">
        <input
          type='text' list={datalistId} placeholder='Search' name='t' id='t'
          className={classnames(bar.input, {[bar.input__full_sized]: isFullSized})}
          onChange={e => this.handleChange(e)}
          pattern={`^[${startPattern}].*`}
        />
        <datalist id={datalistId}>
          {/* Animal Types */}
          {[
            'All',
            'Dogs', 
            'Cats', 
            'Birds', 
            'Rabbits', 
            'Small & Furries', 
            'Fish & Reptiles', 
            'Horses', 
            'Barnyard',
            'Shelters'
            ].map( type => <option key={type}>{type}</option> )
          }
          {/* Trie Results */}
          {suggestions && suggestions.map( (elem, i) => (
            <option key={i} >{elem.breed}</option>
          ))}
        </datalist>
        {isFullSized &&
        <input
          type='submit' value='Submit'
          className={classnames(bar.submit_btn)}
        />
        }
      </form>
    )
  }
}