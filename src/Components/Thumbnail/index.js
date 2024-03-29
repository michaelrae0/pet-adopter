import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import titleCase from 'title-case'

import * as thumbnail from './thumbnail.module.scss'
import { addSearchParams } from '../../utils/strings'
import { fetchFallbackImage } from '../../utils/images'
import { H3, H5 } from '../Typography'

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      currentIndex: 0,
      prepareImage: false,
    }
  }
  filterImages = (image, type) => {
    if (image) return image.medium;
    else return fetchFallbackImage(type);
  }

  maxLen = (str, max) => {
    if (str.length > 25) return str.slice(0, max) + '...';
    else return str 
  }

  changeImage = () => {
    const images = this.props.images;
    const currentIndex = this.state.currentIndex;

    if (currentIndex + 1 === images.length) {
      this.setState({
        currentIndex: 0,
      })
    } else {
      const nextIndex = currentIndex + 1;
      this.setState({
        currentIndex: nextIndex,
      })
    }
  }

  handleMouseEnter = () => {
    this.setState({
      prepareImages: true,
    })
    this.intervalId = setInterval(this.changeImage, 1700);
  }
  handleMouseLeave = () => {
    clearInterval(this.intervalId)
    this.setState({
      currentIndex: 0,
      prepareImages: false,
    })
  }

  render () {
    const { images, title, subtitles, type, id, category, persistentZip } = this.props;
    const { currentIndex } = this.state;

    const backgroundImage = `url(${this.filterImages(images[currentIndex], type)})`;

    return (
      <div className={thumbnail.item} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} >
        <Link 
          to={{
            pathname: `/details${addSearchParams(['category', category,     'id', id], true)}`,
            state: {persistentZip: persistentZip ? persistentZip : ''},
          }}>        
          <div className={thumbnail.image__container}>
            <div className={classnames(thumbnail.image, {[thumbnail.image__active]: !currentIndex}, 'background_image')} style={{ backgroundImage }} />
            {this.state.prepareImages &&
            images.map( (image, i) => {
              if (i === 0) return null;

              const backgroundImage = `url(${image.medium})`;
              return (
                <div
                  className={classnames(thumbnail.image, {[thumbnail.image__active]: currentIndex === i}, 'background_image')}
                  style={{ backgroundImage }}
                  key={i}
                />
              )
            })}
            {images.length > 1 && <div className={thumbnail.image__loading_bar} />}
          </div>

          <div className={thumbnail.text_cont}>
            <H3 className={thumbnail.title} text={titleCase(title)} bold />
            {subtitles.map( line => {
              return (
                <H5 className={thumbnail.subtitle} key={String(id) + line.slice(0, 3)} text={line}/>
              )
            })}
          </div>
        </Link>
      </div>
    )
  }
}

export default Thumbnail;