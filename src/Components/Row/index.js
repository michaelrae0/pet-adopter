import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

import * as styles from './index.module.scss';

const Row = ({ id, children, className, wrap, padded, noMargin}) => (
  <div className={classNames(styles.row, className, {[styles.row__padded]: padded}, {[styles.row__no_margin]: noMargin}, {[styles.row__wrap]: wrap})} id={id}>
    {children}
  </div>
)

Row.propTypes = {
  id: propTypes.string,
  children: propTypes.node.isRequired,
  padded: propTypes.bool,
  noMargin: propTypes.bool,
}

export default Row