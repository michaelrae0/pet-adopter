import React from 'react'

import { Link } from "react-router-dom";
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

      redirect: false,
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
    const { type, breed, breeds, location } = this.state

    const breedOptions = breeds.map( breed => (
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
            <option value='rabbit'>Rabbit</option>
            <option value='small & furry'>Small & Furry</option>
            <option value='scales, fins & other'>Fish & Reptiles</option>
            <option value='horse'>Horse</option>
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
            value={location}
            onChange={ e => this.setState({ location: e.target.value }) }
          />
          <Link
            to={{
              pathname: "/results",
              state: { type, breed, location }
            }} 
          >
            <div
              className={classnames(search.btn)}
            >
              <span>Submit</span>
            </div>
          </Link>
        </form>
      </div>
    )
  }
}

export default Search