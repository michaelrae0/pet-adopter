import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as thumbnail from './thumbnail.module.scss'
import { H1, H2, H3, H4, H5 , H6, SectionBody } from '../Typography'

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      currentIndex: 0,
      prepareImage: false,
    }
  }
  filterImages = image => {
    if (image) return image.medium;
    return 'https://via.placeholder.com/300x250.png?text=Image+Unavailable'
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
    const { images, title, subtitles, id, category } = this.props;
    const { currentIndex } = this.state;

    const backgroundImage = `url(${this.filterImages(images[currentIndex])})`;

    return (
      <div className={classnames(thumbnail.component, thumbnail.col3)} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} >
        <Link to={`/details/${category}/${id}`} >        
          <div className={thumbnail.image_container}>
            <div className={classnames(thumbnail.image, {[thumbnail.image__active]: !currentIndex}, 'background_image')} style={{ backgroundImage }} />
            {this.state.prepareImages &&
            images.map( (image, i) => {
              if (i === 0) return null;

              const backgroundImage = `url(${images[i].medium})`;
              return (
                <div
                className={classnames(thumbnail.image, {[thumbnail.image__active]: currentIndex === i}, 'background_image')}
                style={{ backgroundImage }}
                />
              )
            })}
          </div>

          <div className={thumbnail.text_cont}>
            <H2 className={classnames(thumbnail.title)} text={this.maxLen(title, 21)} />
            {subtitles.map( line => {
              return (
                <H4 
                  className={classnames(thumbnail.subtitle)} key={String(id) + line.slice(0, 3)}
                  text={this.maxLen(line, 25)}
                />
              )
            })}
          </div>
        </Link>
      </div>
    )
  }
}

export default Thumbnail;