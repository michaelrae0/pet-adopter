import React from 'react'

import * as loading from './loading.module.scss'
import Row from '../Row'

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ellipses: '.',
    }
  }
  
  componentDidMount() {
    this.timerId = setInterval(this.timer, 400);
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  timer = () => {
    if (this.state.ellipses !== '...') this.setState({ ellipses: this.state.ellipses + '.' })
    else this.setState({ ellipses: '.' })
  }
  
  render() {
    return (
      <Row className={loading.container} noMargin>
        <span>{'Loading' + this.state.ellipses}</span>
      </Row>
    )
  }
}