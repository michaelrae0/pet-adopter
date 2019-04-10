import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import Loading from '../Loading/index'

import * as animalResults from './animalResults.module.scss'
import api from '../../util/apiClient.js'

class AnimalResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      animals: [],
    }
  }

  componentDidMount() { 
    const { type, breed, location } = this.props.location.state;
    let params = {};

    params['type'] = type ? type : ''
    params['breed'] = breed ? breed : ''
    if (location) params['location'] = location

    // Calls api for animal info
    api.animals(params)
      .then( ({ data }) => {
        console.log(data.animals)
        this.setState({
          isLoading: false,
          animals: data.animals
        })
      })
      .catch( e => console.log(e) )
  }

  render() {
    const { animals } = this.state;
    // console.log(animals)

    const photo = animal => {
      if (animal.photos[0]) return animal.photos[0].medium;
      return 'http://placekitten.com/250/250'
    }

    const animalThumbnails = animals.map( (animal, i) => {
      let breed = '';
      if (animal.breeds.primary.length > 27) {
        breed = animal.breeds.primary.substring(0, 25) + '...';
      } else {
        breed = animal.breeds.primary;
      }
      
      return (
        <Link to={`/details/${animal.id}`} key={animal.id}>
          <div
            className={classnames(animalResults.preview)}
          >
            <div className={classnames(animalResults.pre_thumb_cont)}>
              <img 
                src={photo(animal)}
                alt={animal.name}
                className={classnames(animalResults.pre_thumb)}
              />
            </div>
            <div className={classnames(animalResults.pre_text_cont)}>
              <p className={classnames(animalResults.pre_title)}>{animal.name}</p>
              <p>{breed}</p>
              <p className={classnames(animalResults.pre_location)}>
                {`${animal.contact.address.city}, ${animal.contact.address.state}`}
              </p>
            </div>
          </div>
        </Link>
      )
    })

    return (
      <div className={classnames(animalResults.container)}>

        {this.state.isLoading && <Loading />}
        {!this.state.isLoading && animalThumbnails}

      </div>
    )
  }
}

export default AnimalResults;