import React from 'react'
import classnames from 'classnames'

import Loading from '../Loading/index'

import * as results from './results.module.scss'
import api from '../../util/apiClient.js'

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      animals: [],
    }
  }

  componentDidMount() { 
    const params = {
      type: 'dog',
      page: '2'
    };

    // Calls api for animal info
    api.getAnimals(params)
      .then( ({ data }) => {

        this.setState({
          isLoading: false,
          animals: data.animals
        })
      });
  }

  render() {
    const { animals } = this.state;

    return (
      <div className={classnames(results.container)}>

        {this.state.isLoading && <Loading />}
        {!this.state.isLoading && animals.map( (animal, i) => {
          return (
            <div
              key={animal.id}
              className={classnames(results.preview)}
            >
              <img 
                src={animal.photos[0].medium || 'https://placekitten.com/250/250'}
                alt={animal.name}
                className={classnames(results.thumbnail)}
              />
              <p>{i + 1}</p>
              <p>{animal.name}</p>
              <p>{`${animal.contact.address.city}, ${animal.contact.address.state}`}</p>

            </div>
          )
        })}

      </div>
    )
  }
}

export default Results;