import React from 'react'
import classnames from 'classnames'

import * as search from './search.module.scss'
import api from '../../util/apiClient'

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'dog',
      breed: '',
      breeds: ['Loading...'],
      location: '',
    }
  }
  
  componentDidMount() {
    this.setBreeds(this.state.type);
  }

  setBreeds = type => {
    this.setState({ breeds: ['Loading...'] })

    api.breeds( {type} )
      .then( ({data}) => {
        const breeds = data.breeds.map( breed => breed.name);
        this.setState({ breeds })
      })
  }

  render() {
    // console.log(this.state)
    const breedOptions = this.state.breeds.map( breed => (
      <option value={breed} key={breed} >{breed}</option> 
    ));

    return (
      <div className={classnames(search.container)}>
        <form
          action=''
          method='POST'
          onSubmit={this.submitForm}
        >
          <label htmlFor='type' >Type</label>
          <select 
            type='select' name='type' id='type'
            className={classnames(search.form_info, search.type)}
            onChange={ e => {
              this.setBreeds(e.target.value);
              this.setState({ type: e.target.value });
            }}
          >
            <option value='dog'>Dog</option>
            <option value='cat'>Cat</option>
            <option value='bird'>Bird</option>
            <option value='scales, fins, & other'>Fish & Reptiles</option>
            <option value='rabbit'>Rabbit</option>
            <option value='horse'>Horse</option>
            <option value='small & furry'>Small & Furry</option>
            <option value='barnyard'>Barnyard</option>
          </select>
          <label htmlFor='breed' >Breed</label>
          <select 
            placeholder='Boxer' type='select' name='breed' id='breed'
            className={classnames(search.form_info, search.breed)}
            onChange={ e => this.setState({ breed: e.target.value }) }
          >
            <option value='' ></option>
            {breedOptions}
          </select>
          <label htmlFor='location' >Location</label>
          <input
            placeholder='Atlanta, GA' type='text' name='location' id='location'
            className={classnames(search.form_info, search.location)}
            value={this.state.location}
            onChange={ e => {
              let places = e.target.value.split(',');
              if (!places[1]) places[1] = '';

              this.setState({
                location: e.target.value,
                city: places[0].trim,
                state: places[1].trim,
              }) 
            }}
          />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default Search