import React from 'react'
import classnames from 'classnames'

import * as search from './search.module.scss'
import api from '../../util/apiClient'
import Container from '../../components/Container'
import Row from '../../components/Row'
import AnimalForm from '../../components/AnimalForm'
import ShelterForm from '../../components/ShelterForm'

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animalSearch: true,

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
    this.setState({ animalSearch: bool })
  }

  changeParentState = ( property, value ) => {
    this.setState({
      [property]: value,
    })
  }

  render() {
    const { 
      animalSearch,
      type,
      breed,
      breeds,
      animalLocation,
      shelterLocation,
      distance,
    } = this.state

    return (
      <section className={search.section}>
        <Container>
          <Row>
            <div className={search.component}>
              <div className={classnames(search.selectors)}>
                <div
                  className={classnames(search.selector, search.selector__animals, {[search.selected]: animalSearch})}
                  onClick={ () => this.handleOnClick(true) }
                >
                  <p>Animals</p>
                </div>
                <div
                  className={classnames(search.selector, search.selector__shelters, {[search.selected]: !animalSearch})}
                  onClick={ () => this.handleOnClick(false) }
                >
                  <p>Shelters</p>
                </div>
              </div>

              <div className={classnames(search.form_cont)}>
                {animalSearch &&
                <AnimalForm
                  filters={{type, breed, breeds, animalLocation, animalSearch}}
                  changeParentState={this.changeParentState}
                  fetchBreeds={this.fetchBreeds}
                />}
                {!animalSearch &&
                <ShelterForm
                  filters={{shelterLocation, distance, animalSearch}}
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