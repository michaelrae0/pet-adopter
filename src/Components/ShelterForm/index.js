import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as forms from '../Search/forms.module.scss'

class ShelterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      distance: 10,
    }
  }

  render() {
    const { location, distance } = this.state;

    return (
      <form>

        <label htmlFor='location' >Location</label>
        <input 
          placeholder='<City, ST> or <zipcode>' type='text' name='location' id='location'
          className={classnames(forms.form_info, forms.location)}
          onChange={ e => this.setState({ location: e.target.value }) }
        />

        <label htmlFor='distance' >Distance</label>
        <select 
          type='select' name='distance' id='distance'
          className={classnames(forms.form_info, forms.distance)}
          onChange={ e => this.setState({ distance: e.target.value }) }
        >
          <option value='10' >10 miles</option>
          <option value='25' >25 miles</option>
          <option value='50' >50 miles</option>
          <option value='100' >100 miles</option>
        </select>

        <div className={classnames(forms.outer_div_btn)}>
          <Link
            to={{
              pathname: "/shelters",
              state: { location, distance }
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