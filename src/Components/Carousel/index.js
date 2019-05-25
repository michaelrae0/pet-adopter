import React from 'react'
import classnames from 'classnames'

import * as cara from './carousel.module.scss'
import Container from '../Container'
import Row from '../Row'
import { fetchFallbackImage } from '../../utils/images';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      caraPhotos: [],
      imageCollection: [],

      imagesLoaded: false,
      currentIndex: 0,

      backAvailable: false,
      nextAvailable: false,
    }
  }
  
  componentWillMount() {
    let caraPhotos = [];
    let imageCollection = [];

    if (!this.props.photos[0]) {
      caraPhotos = [{
        full: fetchFallbackImage(this.props.type),
        medium: fetchFallbackImage(this.props.type),
      }];
      imageCollection.length = 1;
    }
    else {
      caraPhotos = this.props.photos;
      imageCollection.length = caraPhotos.length;
    }
    imageCollection.fill(null)

    this.setState({
      caraPhotos,
      imageCollection,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleImageClick(this.state.currentIndex, true))
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.handleImageClick(this.state.currentIndex, true))
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

  fetchImageWidths = () => {
    const { imageCollection } = this.state;

    // calculate every time incase images change width (mobile/desktop)
    let result = [];
    // can't use forEach on collections
    for(let i = 0; i < imageCollection.length; i++) {
      result.push(imageCollection[i].offsetWidth)
    }

    return result
  }

  handleLoad = (i) => {
    let collection = this.state.imageCollection;
    collection[i] = 'loaded'

    if (collection.indexOf(null) === -1) {
      const imageCollection = document.getElementsByClassName(`${cara.cara__image}`)
      this.setState({
        imageCollection,
      })
      this.handleImageClick(0, false, imageCollection[0].offsetWidth)
    }
  }
  handleImageClick = (i, isScrollEvent, initialWidth = null) => {
    const { imagesLoaded } = this.state;

    // Fetch divs for width lookups and updating styles
    const scrollingContainer = document.querySelector(`.${cara.cara__scrolling_container}`)
    const viewport = document.querySelector(`.${cara.cara__viewport}`)

    // initialWidth is only truthy when all images first finish loading
    const imageWidths = !initialWidth && this.fetchImageWidths(); 
    const clickedImage = initialWidth || imageWidths[i];
    const viewportWidth = viewport.offsetWidth;
    const widthBefore = i > 0 ? imageWidths.slice(0, i).reduce( (sum, width) => sum + width ) : 0;

    const offsetX = viewportWidth / 2 - (clickedImage / 2 + widthBefore);
    scrollingContainer.style.transform = `translateX(${offsetX}px)`;

    // remove laggy resizing (isScrollEvent) and transition on first load (!imagesLoaded)
    scrollingContainer.style.transition = isScrollEvent || !imagesLoaded ? 'none' : 'transform 0.35s ease-in-out';

    this.setState({
      currentIndex: i,
      imagesLoaded: true,
    })
  }
  
  render() {
    const { caraPhotos, imagesLoaded, currentIndex } = this.state;

    const formattedContainers = photos => {
      return photos.map( (photo, i) => {
        return (
          <div className={classnames(cara.cara__image_container, {[cara.cara__image_container__active]: currentIndex === i})} key={i}>
            <img 
              src={photo.full} 
              alt='' 
              className={cara.cara__image} 
              onLoad={() => this.handleLoad(i)}
              onClick={() => this.handleImageClick(i)}
            />
          </div>
        )
      })
    }

    const formattedSubCara = photos => {
      return photos.map( (photo, i) => {
        return (
          <div 
            className={classnames(cara.subcara, {[cara.subcara__active]: currentIndex === i})} 
            onClick={() => this.handleImageClick(i)}
            key={i}/>
        )
      })
    }

    return (
      <section className={cara.section}>
        <Row className={cara.cara__row} noMargin>
          <div className={cara.cara__viewport}>
            <div className={classnames(cara.cara__scrolling_container, {[cara.cara__scrolling_container__loading]: !imagesLoaded})} >
              
              {formattedContainers(caraPhotos)}

            </div>
          </div>
        </Row>
        <div className={cara.subcara__wrapper}>
          <Container className={cara.subcara__container}>
            <Row className={cara.subcara__row}>

              {formattedSubCara(caraPhotos)}
              
            </Row>
          </Container>
        </div>
      </section>
    )
  }
}