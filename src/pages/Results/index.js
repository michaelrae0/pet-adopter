import React from 'react'

import Container from '../../Components/Container'
import Row from '../../Components/Row'
import Loading from '../../Components/Loading/index'
import Thumbnail from '../../Components/Thumbnail/index'

import * as results from './results.module.scss'
import api from '../../util/apiClient.js'

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      animals: [],
      orgs: [],
    }
  }

  componentDidMount() { 
    const { type, breed, location, distance, animalSearch } = this.props.location.state;
    let params = {};

    if (animalSearch) {
      params['type'] = type ? type : ''
      params['breed'] = breed ? breed : ''
      if (location) params['location'] = location
  
      // Calls api for animal info
      api.animals(params)
        .then( ({ data }) => {
          console.log(data.animals)
          this.setState({
            isLoading: false,
            animals: data.animals
          })
        })
        .catch( e => console.log(e) );
    }
    else {
      if (location) {
        params['location'] = location
        params['distance'] = distance // requires location to be set
      }
  
      // Calls api for org info
      api.orgs(params)
        .then( ({ data }) => {
          console.log(data)
          this.setState({
            isLoading: false,
            orgs: data.organizations
          })
        })
        .catch( e => console.log(e) )
    }

  }

  render() {
    const { animals, orgs } = this.state;
    const { animalSearch } = this.props.location.state

    if (this.state.isLoading) return <Loading />;
    return (
      <section className={results.section}>
        <Container>
          <Row className={results.row} wrap>
            {animalSearch && 
            animals.map( animal => {
              const subtitles = [animal.breeds.primary, `${animal.contact.address.city}, ${animal.contact.address.state}`];
              return (
                <Thumbnail
                  title={animal.name}
                  subtitles={subtitles}
                  image={animal.photos[0]}
                  id={animal.id}
                  key={animal.id}
                  category={'animal'}
                />
              );
            })}
            {!animalSearch && 
            orgs.map( org => {
              const subtitles = [`${org.address.city}, ${org.address.state}`];
              return (
                <Thumbnail
                  title={org.name}
                  subtitles={subtitles}
                  image={org.photos[0]}

                  id={org.id}
                  key={org.id}
                  category={'organization'}
                />
              );
            })}
          </Row>
        </Container>
      </section>
    );
  }
}

export default Results;