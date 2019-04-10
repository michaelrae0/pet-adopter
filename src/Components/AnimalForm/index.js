import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as forms from '../../pages/Search/forms.module.scss'
import api from '../../util/apiClient'

class AnimalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      breed: '',
      breeds: [],
      location: '',
    }
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
      <form>

        <label htmlFor='type' >Type</label>
        <select 
          type='select' name='type' id='type'
          className={classnames(forms.form_info, forms.type)}
          onChange={ e => {
            if (e.target.value !== '') {
              this.setBreeds(e.target.value);
            } else {
              this.setState({ breeds: [] })
            }
            this.setState({ type: e.target.value });
          }}
        >
          <option value=''>All</option>
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
          className={classnames(forms.form_info, forms.breed)}
          onChange={ e => this.setState({ breed: e.target.value }) }
        >
          <option value='' >All</option>
          {breedOptions}
        </select>

        <label htmlFor='location' >Location</label>
        <input
          placeholder='Atlanta, GA' type='text' name='location' id='location'
          className={classnames(forms.form_info, forms.location)}
          value={location}
          onChange={ e => this.setState({ location: e.target.value }) }
        />

        <div className={classnames(forms.outer_div_btn)}>
          <Link
            to={{
              pathname: "/animals",
              state: { type, breed, location }
            }} 
            className={classnames(forms.btn)}
          >
              <span>Submit</span>
          </Link>
        </div>
      </form>
    )
  }
}

export default AnimalForm;