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
      nextAvailable: false,
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

    this.setState({
      caraPhotos,
    });
  }

  componentDidMount() {
    this.scrollCarousel(0);
  }

  updateArrowAvailability = (index, photos = this.state.caraPhotos) => {
    let back, next;
    
    if (photos.length === 1 || photos.length === 0) {
      back = false;
      next = false;
    }
    else {
      if (index) back = true;
      else       back = false;

      if (index + 1 < photos.length) next = true;
      else                           next = false;
    }

    this.setState({
      backAvailable: back,
      nextAvailable: next,
    })
  }

  handleArrowClick = isNext => {
    const { currentIndex, backAvailable, nextAvailable } = this.state;
    let newIndex = currentIndex;

    if (!isNext && backAvailable) newIndex--;
    else if (isNext && nextAvailable) newIndex++;  

    this.scrollCarousel(newIndex);
  }

  scrollCarousel = i => {
    const previews = document.querySelector(`.${cara.previews}`);
    const offset = (this.state.caraPhotos.length - 1) - (i * 2 );
    const previewWidth = 180 + (16 * 0.15 * 2);
    const padding = offset * previewWidth;

    if (padding > 0) {
      previews.style.paddingLeft = padding + 'px';
      previews.style.paddingRight = 0 + 'px';
    }
    else if (padding === 0) {
      previews.style.paddingLeft = previewWidth + 'px';
      previews.style.paddingRight = previewWidth + 'px';
    }
    else {
      previews.style.paddingLeft = 0 + 'px';
      previews.style.paddingRight = -padding + 'px';
    }

    this.setState({
      currentIndex: i,
    })
    this.updateArrowAvailability(i)
  }
  
  render() {
    const { caraPhotos, currentIndex, backAvailable, nextAvailable } = this.state;

    return (
      <section className={cara.section}>
        <Row className={cara.row}>
          <div className={cara.carousel}>
            <img src={caraPhotos[currentIndex].full} alt='' className={cara.image} />
          </div>
        </Row>

        <div className={cara.preview_container}>
          <div
            className={classnames(cara.arrow_container, cara.arrow_container_back, {[cara.arrow_container__active]: backAvailable})}
            onClick={() => this.handleArrowClick(false)}
          >
            <ArrowSVG className={classnames(cara.arrow, cara.arrow_back)} key={2} />
          </div>
          <Row className={cara.preview_row} noMargin>
            <div className={cara.previews} >
              {caraPhotos.map( (photo, i) => {
                
                return (
                  <div
                    className={classnames(cara.preview_image_container, {[cara.preview_image_container__active]: i === currentIndex})}
                    onClick={() => this.scrollCarousel(i)}
                    key={i}
                  >
                    <img src={photo.medium} alt='' className={cara.preview_image} />
                  </div>
                )
              })}
            </div>
          </Row>
          <div 
            className={classnames(cara.arrow_container, cara.arrow_container_next, {[cara.arrow_container__active]: nextAvailable})}
            onClick={() => this.handleArrowClick(true)}
          >
            <ArrowSVG className={classnames(cara.arrow, cara.arrow_next)} key={2} />
          </div>
        </div>
      </section>
    )
  }
}