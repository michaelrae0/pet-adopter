import React from 'react'
import classnames from 'classnames'

import * as landing from './landingPage.module.scss'
import api from '../../utils/apiClient'
import Container from '../../components/Container'
import Row from '../../components/Row'
import SearchBar from '../../components/SearchBar'

export default class LandingPage extends React.Component {
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

    // console.log(breedsTrie.startsWith('e'))

    return (
      <section className={landing.section}>
        <Container restricted>
          <Row className={landing.row}>
            <SearchBar isFullSized />
          </Row>
        </Container>
      </section>
    )
  }
}