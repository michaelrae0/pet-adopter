import React from 'react'
import classnames from 'classnames'

import * as header from './header.module.scss'

class Header extends React.Component {
  render() {
    return (
      <div className={classnames(header.navbar)}>
        <div className={classnames(header.image_container)}>
          <img 
            src='http://placekitten.com/80/80' 
            alt='' 
            className={header.image}
          />
        </div>
        <div className={header.categories}>
          <h2 className={header.link} >All</h2>
          <h2 className={header.link} >Dogs</h2>
          <h2 className={header.link} >Cats</h2>
          <h2 className={header.link} >Search</h2>
        </div>
      </div>
      )
  }
}

export default Header;