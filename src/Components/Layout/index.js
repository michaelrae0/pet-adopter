import React from 'react'
import classnames from 'classnames'

import Header from '../Header/index'

import * as layout from './layout.module.scss'

class Layout extends React.Component {
  render() {
    return (
      <div className={classnames(layout.container)}>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default Layout