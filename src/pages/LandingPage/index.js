import React from 'react'

import * as landing from './landingPage.module.scss'
import api from '../../utils/apiClient'
import { H1 } from '../../Components/Typography'
import Container from '../../Components/Container'
import Row from '../../Components/Row'
import SearchBar from '../../Components/SearchBar'

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
    const { persistentZip } = this.props.location.state ? this.props.location.state : '';
    
    return (
      <section className={landing.section} >
        <Container className={landing.container}>
          <Row className={landing.row}>
            <H1
              className={landing.title}
              text='Find Your Next Best Friend'
            />
            <SearchBar isFullSized history={this.props.history} persistentZip={persistentZip} />
          </Row>
        </Container>
      </section>
    )
  }
}