import React from 'react'
import classnames from 'classnames'

import Container from '../../Components/Container'
import Row from '../../Components/Row'
import AnimalForm from '../../Components/AnimalForm/index'
import ShelterForm from '../../Components/ShelterForm/index'

import * as search from './search.module.scss'
import api from '../../util/apiClient'

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animalForm: true,

      type: '',
      breed: '',
      breeds: [],
      animalLocation: '',

      shelterLocation: '',
      distance: 10,
    }
  }

  fetchBreeds = type => {
    this.setState({ breeds: ['Loading...'] });

    api.breeds( {type} )
      .then( ({data}) => {
        this.setState({ breeds: data.breeds.map( breed => breed.name) });
      });
  }

  handleOnClick = bool => {
    this.setState({ animalForm: bool })
  }

  changeParentState = ( property, value ) => {
    this.setState({
      [property]: value,
    })
  }

  render() {
    const { 
      animalForm,
      type,
      breed,
      breeds,
      animalLocation,
      shelterLocation,
      distance,
    } = this.state

    console.log(this.state.shelterLocation)

    return (
      <section className={search.section}>
        <Container>
          <Row>
            <div className={search.component}>
              <div className={classnames(search.selectors)}>
                <div
                  className={classnames(search.selector, search.selector__animals, {[search.selected]: animalForm})}
                  onClick={ () => this.handleOnClick(true) }
                >
                  <p>Animals</p>
                </div>
                <div
                  className={classnames(search.selector, search.selector__shelters, {[search.selected]: !animalForm})}
                  onClick={ () => this.handleOnClick(false) }
                >
                  <p>Shelters</p>
                </div>
              </div>

              <div className={classnames(search.form_cont)}>
                {animalForm &&
                <AnimalForm
                  filters={{type, breed, breeds, animalLocation}}
                  changeParentState={this.changeParentState}
                  fetchBreeds={this.fetchBreeds}
                />}
                {!animalForm &&
                <ShelterForm
                  filters={{shelterLocation, distance}}
                  changeParentState={this.changeParentState}
                />}
              </div>
            </div>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Search