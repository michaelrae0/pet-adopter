import React from 'react'

import * as loading from './loading.module.scss'
import Row from '../Row'
import { ReactComponent as LoadingSVG } from '../../images/Loading.svg'

const Loading = () => (
  <Row className={loading.container} noMargin>
    <LoadingSVG />
  </Row>
)

export default Loading;