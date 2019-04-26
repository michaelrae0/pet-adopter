import React from 'react'
import classnames from 'classnames'
// import InlineSVG from 'svg-inline-react'

import * as cara from './carousel.module.scss'
import Container from '../Container'
import Row from '../Row'
import { ReactComponent as ArrowSVG } from '../../images/Arrow.svg'

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullSizedPhotos: [],
      currentIndex: 0,
      backAvailable: false,
      nextAvailable: false
    }
  }
  
  componentDidMount() {
    let fullSizedPhotos = [];

    if (!this.props.photos[0]) {
      fullSizedPhotos = ['https://via.placeholder.com/900x700.png?text=No+Image+Available'];
    }
    else {
      fullSizedPhotos = this.props.photos.map( photo => photo.full )
    }

    this.arrowAvailability(0, fullSizedPhotos);
    this.setState({ fullSizedPhotos });
  }

  arrowAvailability = (index, photos) => {
    let back, next;

    if (photos.length === 1 || photos.length === 0) {
      back = false;
      next = false;
    }
    else {
      if (!index) back = false;
      else        back = true;
      if (index + 1 === photos.length) next = false;
      else                             next = true;
    }

    this.setState({
      backAvailable: back,
      nextAvailable: next,
      currentIndex: index,
    })
  }

  handleOnClick = next => {
    const { currentIndex, fullSizedPhotos } = this.state;

    if (next === false) {
      this.arrowAvailability(currentIndex - 1, fullSizedPhotos);
    }
    if (next === true) {
      this.arrowAvailability(currentIndex + 1, fullSizedPhotos);
    }
  }
  
  render() {
    const { fullSizedPhotos, currentIndex, backAvailable, nextAvailable } = this.state;
    console.log(fullSizedPhotos)

    // Navigation buttons won't render if currentIndex is 0 or length-1
    return (
      <section className={cara.section}>
        <Container>
          <Row className={cara.row}>
            <div className={cara.carousel}>
              <img src={fullSizedPhotos[currentIndex]} alt='' className={cara.image} />
              {backAvailable &&
              <div className={classnames(cara.btn, cara.btn__back)} onClick={() => this.handleOnClick(false)} >
                <div className={cara.arrow_container}>
                  <ArrowSVG className={classnames(cara.arrow, cara.arrow_back)} key={2} />
                </div>
              </div>}
              {nextAvailable &&
              <div className={classnames(cara.btn, cara.btn__next)} onClick={() => this.handleOnClick(true)} >
                <div className={cara.arrow_container}>
                  <ArrowSVG className={classnames(cara.arrow, cara.arrow_next)} />
                </div>
              </div>}
            </div>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Carousel;