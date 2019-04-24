import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

import * as styles from './index.module.scss';

const Container = ({ id, children, className, restricted}) => (
  <div className={classNames(styles.container, className, {[styles.container__restricted]: restricted})} id={id}>
    {children}
  </div>
)

Container.propTypes = {
  id: propTypes.string,
  children: propTypes.node.isRequired,
}

export default Container