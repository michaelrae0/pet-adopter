import React from 'react'
import classnames from 'classnames'

import * as cara from './carousel.module.scss'
import Row from '../Row'
import { ReactComponent as ArrowSVG } from '../../images/Arrow.svg'

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      caraPhotos: [],
      currentIndex: 0,
      backAvailable: false,
      nextAvailable: false
    }
  }
  
  componentWillMount() {
    let caraPhotos = [];

    if (!this.props.photos[0]) {
      caraPhotos = [{
        full: 'https://via.placeholder.com/900x700.png?text=No+Image+Available',
        medium: 'https://via.placeholder.com/900x700.png?text=No+Image+Available',
      }];
    }
    else {
      caraPhotos = this.props.photos;
    }

    this.setState({ caraPhotos });

    this.arrowAvailability(0, caraPhotos);
  }

  componentDidMount() {
    this.handlePreviewClick(0);
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
    const { currentIndex, caraPhotos } = this.state;

    if (next === false) {
      this.arrowAvailability(currentIndex - 1, caraPhotos);
    }
    if (next === true) {
      this.arrowAvailability(currentIndex + 1, caraPhotos);
    }
  }

  handlePreviewClick = (i, event = '') => {
    if (event) event.preventDefault();
    const previews = document.querySelector(`.${cara.previews}`);
    const offset = ((this.state.caraPhotos.length - 1) - (i * 2 )) ;
    const previewWidth = 180 + (16 * 0.15 * 2);
    const padding = offset * previewWidth;

    if (padding >= 0) {
      previews.style.paddingLeft = padding + 'px';
      previews.style.paddingRight = 0 + 'px';
    } else {
      previews.style.paddingLeft = 0 + 'px';
      previews.style.paddingRight = -padding + 'px';
    }


    this.setState({
      currentIndex: i,
    })
  }
  
  render() {
    const { caraPhotos, currentIndex, backAvailable, nextAvailable } = this.state;

    return (
      <section className={cara.section}>
        <Row className={cara.row}>
          <div className={cara.carousel}>
            <img src={caraPhotos[currentIndex].full} alt='' className={cara.image} />
            {/* {backAvailable &&
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
            </div>} */}
          </div>
        </Row>
        <div className={cara.preview_container}>
          <Row className={cara.preview_row} noMargin>
            <div className={cara.previews} >
              {caraPhotos.map( (photo, i) => {
                
                return (
                  <div
                    className={classnames(cara.preview_image_container, {[cara.preview_image_container__active]: i === currentIndex})}
                    onClick={e => this.handlePreviewClick(i, e)}
                  >
                    <img src={photo.medium} alt='' className={cara.preview_image} />
                  </div>
                )
              })}
            </div>
          </Row>
        </div>
      </section>
    )
  }
}