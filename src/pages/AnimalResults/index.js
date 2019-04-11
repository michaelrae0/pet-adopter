import React from 'react'
import classnames from 'classnames'

import Loading from '../../Components/Loading/index'
import Thumbnail from '../../Components/Thumbnail/index'

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

    const animalThumbnails = animals.map( animal => {
      const body = [animal.breeds.primary, `${animal.contact.address.city}, ${animal.contact.address.state}`];
      return (
        <Thumbnail
          images={animal.photos[0]}
          header={animal.name}
          body={body}
          id={animal.id}
          key={animal.id}
          category={'animal'}
        />
      )
    });

    return (
      <div className={classnames(animalResults.container)}>
        {this.state.isLoading && <Loading />}
        {!this.state.isLoading && animalThumbnails}
      </div>
    )
  }
}

export default AnimalResults;