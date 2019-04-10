import React from 'react'
import _cn from 'classnames'

import AnimalForm from '../AnimalForm/index'
import ShelterForm from '../ShelterForm/index'

import * as search from './search.module.scss'

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: 'animal'
    }
  }

  render() {
    const { form } = this.state

    let animalStyles = {};
    let shelterStyles = {};

    if (form === 'animal') {
      animalStyles = _cn(search.animal_selector, search.selected)
      shelterStyles = _cn(search.shelter_selector)
    } else {
      shelterStyles = _cn(search.shelter_selector, search.selected)
      animalStyles = _cn(search.animal_selector)
    }

    return (
      <div className={_cn(search.container)}>

        <div  className={_cn(search.selector_cont)}>
          <div
          className={animalStyles}
          >
            <p>Animals</p>
          </div>
          <div className={shelterStyles}>
            <p>Shelters</p>
          </div>
        </div>

        <div className={_cn(search.form_cont)}>
          {(form === 'animal') && <AnimalForm />}
          {(form === 'shelter') && <ShelterForm />}
        </div>
        
      </div>
    )
  }
}

export default Search