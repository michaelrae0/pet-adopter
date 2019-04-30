import React from 'react'
import classnames from 'classnames'

import * as bar from './searchBar.module.scss'

export default class SearchBar extends React.Component {
  render() {
    return (
      <form action="/s/animals/1" >
        <input
          type='text' placeholder='Search' name='t' id='t'
          className={bar.input}
        />
      </form>
    )
  }
}