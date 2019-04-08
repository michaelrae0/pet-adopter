import React from 'react'
import classnames from 'classnames'

import * as loading from './loading.module.scss'

class Loading extends React.Component {
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
      <div className={classnames(loading.container)}>
        <span>{'Loading' + this.state.ellipses}</span>
      </div>
    )
  }
}

export default Loading