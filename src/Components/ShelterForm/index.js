import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as forms from '../../pages/Search/forms.module.scss'

class ShelterForm extends React.Component {
  render() {
    const { changeParentState, filters } = this.props;
    const { shelterLocation, distance, animalSearch } = filters;

    return (
      <form>

        <label htmlFor='location' >Location</label>
        <input 
          placeholder='<City, ST> or <zipcode>' type='text' name='location' id='location'
          className={classnames(forms.form_info, forms.location)}
          value={shelterLocation}
          onChange={ e => changeParentState('shelterLocation', e.target.value) }
        />

        <label htmlFor='distance' >Distance</label>
        <select 
          type='select' name='distance' id='distance'
          className={classnames(forms.form_info, forms.distance)}
          value={distance}
          onChange={ e => changeParentState('distance', e.target.value) }
        >
          <option value='10' >10 miles</option>
          <option value='25' >25 miles</option>
          <option value='50' >50 miles</option>
          <option value='100' >100 miles</option>
        </select>

        <div className={classnames(forms.outer_div_btn)}>
          <Link
            to={{
              pathname: `/s/shelters/${1}`,
              state: { shelterLocation, distance, animalSearch }
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

export default ShelterForm;