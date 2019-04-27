import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as thumbnail from './thumbnail.module.scss'

const Thumbnail = ({ image, title, subtitles, id, category }) => {
  const filterImages = image => {
    if (image) return image.medium;
    return 'https://via.placeholder.com/300x250.png?text=Image+Unavailable'
  }

  const maxLen = (str, max) => {
    if (str.length > 25) return str.slice(0, max) + '...';
    else return str 
  }

  const backgroundImage = `url(${filterImages(image)})`

  return (
      <div className={classnames(thumbnail.container, thumbnail.col3)} >
        <Link to={`/details/${category}/${id}`} >        
          <div className={classnames(thumbnail.image_cont, 'background_image')} style={{ backgroundImage }} />
          <div className={thumbnail.text_cont}>
            <p className={classnames(thumbnail.header)}>{maxLen(title, 21)}</p>
            {subtitles.map( line => {
              return (
                <p className={classnames(thumbnail.body_line)} key={String(id) + line.slice(0, 3)} >
                  {maxLen(line, 25)}
                </p> 
              )
            })}
          </div>
        </Link>
      </div>
  )
}

export default Thumbnail;