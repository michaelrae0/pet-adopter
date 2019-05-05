import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as forms from '../../pages/LandingPage/forms.module.scss'

export default class AnimalForm extends React.Component {
  render() {
    const { changeParentState, fetchBreeds, filters } = this.props;
    const { type, breed, breeds, animalLocation, animalSearch } = filters;

    const breedOptions = breeds.map( breed => (
      <option value={breed} key={breed} >{breed}</option> 
    ));

    return (
      <form>

        <label htmlFor='type' >Type</label>
        <select 
          type='select' name='type' id='type'
          className={classnames(forms.form_info, forms.type)}
          value={type}
          onChange={ e => {
            if (e.target.value === '') {
              changeParentState('breeds', [])
            } else {
              fetchBreeds(e.target.value);
            }
            changeParentState('type', e.target.value);
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
          value={breed}
          onChange={ e => changeParentState('breed', e.target.value) }
        >
          <option value='' >All</option>
          {breedOptions}
        </select>

        <label htmlFor='location' >Location</label>
        <input
          placeholder='Atlanta, GA' type='text' name='location' id='location'
          className={classnames(forms.form_info, forms.location)}
          value={animalLocation}
          onChange={ e => changeParentState('animalLocation', e.target.value) }
        />

        <div className={classnames(forms.outer_div_btn)}>
          <Link
            to={{
              pathname: `/s/animals/${1}`,
              state: { type, breed, animalLocation, animalSearch }
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