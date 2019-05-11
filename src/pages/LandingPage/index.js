import React from 'react'

import * as landing from './landingPage.module.scss'
import api from '../../utils/apiClient'
import { H1 } from '../../components/Typography'
import Container from '../../components/Container'
import Row from '../../components/Row'
import SearchBar from '../../components/SearchBar'

export default class LandingPage extends React.Component {
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
    const image = require('../../images/Running_Dog_Background.jpg');
    const backgroundImage = `url(${image})`

    return (
      <section className={landing.section} style={{backgroundImage}} >
        <Container>
          <Row className={landing.row}>
            <H1
              className={landing.title}
              text='Find Your Next Best Friend'
            />
            <SearchBar isFullSized />
          </Row>
        </Container>
      </section>
    )
  }
}