import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import Container from "../Container";
import Row from "../Row";
import Column from "../Column"
import * as section from './section.module.scss';

class Section extends React.Component {
  static defaultProps = {
    direction: 'row'
  }

  render() {
    const { textColor, background, style, className, rowClassName, columnClassName, direction } = this.props;
    return(
      <section className={classnames(section.site_section, className, section[background], section[textColor])} style={style}>
        <Container>
          {direction === 'row' &&
          <Row className={rowClassName}>
            {this.props.children}
          </Row>}
          {direction === 'column' &&
          <Column className={columnClassName}>
            {this.props.children}
          </Column>}
        </Container>
      </section>
    )
  }
}

export default Section