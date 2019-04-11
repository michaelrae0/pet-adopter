import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as thumbnail from './thumbnail.module.scss'

const Thumbnail = ({ images, header, body, id, category }) => {
  const filterImages = images => {
    if (images) return images.medium;
    return 'http://placekitten.com/250/250'
  }

  const maxLen = (str, max) => {
    if (str.length > 25) return str.substring(0, max) + '...';
    else return str 
  }

  const mappedBody = body.map( line => (
    <p className={classnames(thumbnail.body_line)} key={String(id) + line} >
      {maxLen(line, 25)}
    </p> 
  ));

  return (
    <Link to={`/details/${category}/${id}`} >
      <div className={classnames(thumbnail.container)} >
        
        <div className={classnames(thumbnail.image_cont)}>
          <img 
            src={filterImages(images)}
            alt={header}
            className={classnames(thumbnail.image)}
          />
        </div>
        
        <div className={classnames(thumbnail.text_cont)}>
          <p className={classnames(thumbnail.header)}>{maxLen(header, 21)}</p>
          {mappedBody}
        </div>

      </div>
    </Link>
  )
}

export default Thumbnail;