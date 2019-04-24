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

  const backgroundImage = `url(${filterImages(images)})`

  return (

      <div className={classnames(thumbnail.container, thumbnail.col3)} >
        <Link to={`/details/${category}/${id}`} >
        
          <div className={classnames(thumbnail.image_cont, 'background_image')} style={{ backgroundImage }}>
          </div>
          
          <div className={thumbnail.text_cont}>
            <p className={classnames(thumbnail.header)}>{maxLen(header, 21)}</p>
            {mappedBody}
          </div>
        </Link>
      </div>
  )
}

export default Thumbnail;