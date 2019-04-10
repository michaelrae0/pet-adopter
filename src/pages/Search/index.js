import React from 'react'
import classnames from 'classnames'

import AnimalForm from '../../Components/AnimalForm/index'
import ShelterForm from '../../Components/ShelterForm/index'

import * as search from './search.module.scss'

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: 'animal'
    }
  }

  handleOnClick = (id) => {
    this.setState({ form: id })
  }

  render() {
    const { form } = this.state

    let animalStyles = {};
    let shelterStyles = {};

    if (form === 'animal') {
      animalStyles = classnames(search.animal_selector, search.selected)
      shelterStyles = classnames(search.shelter_selector)
    } else {
      shelterStyles = classnames(search.shelter_selector, search.selected)
      animalStyles = classnames(search.animal_selector)
    }

    return (
      <div className={classnames(search.container)}>

        <div className={classnames(search.selectors)}>
          <div
            className={animalStyles}
            onClick={ () => this.handleOnClick('animal') }
          >
            <p>Animals</p>
          </div>
          <div
            className={shelterStyles}
            onClick={ () => this.handleOnClick('shelter') }
          >
            <p>Shelters</p>
          </div>
        </div>

        <div className={classnames(search.form_cont)}>
          {(form === 'animal') && <AnimalForm />}
          {(form === 'shelter') && <ShelterForm />}
        </div>

      </div>
    )
  }
}

export default Search