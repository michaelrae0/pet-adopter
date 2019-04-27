import React from 'react'
import classnames from 'classnames'

import * as layout from './layout.module.scss'
import Header from '../Header'

const Layout = () => (
  <div className={classnames(layout.container)}>
    <Header />
    {this.props.children}
  </div>
);

export default Layout;