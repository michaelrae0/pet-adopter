import React from 'react'
import classnames from 'classnames'

import Container from '../../Components/Container'
import Row from '../../Components/Row'
import Loading from '../../Components/Loading/index'
import Carousel from '../../Components/Carousel/index'
import AnimalDetails from '../../Components/AnimalDetails/index'
import ShelterDetails from '../../Components/ShelterDetails/index'

import api from '../../util/apiClient'
import * as details from './details.module.scss'

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {},
      isLoading: true,
    }
  }

  componentDidMount() {
    const { id, searchType } = this.props.match.params;

    const params = {
      id,
    }

    // Choose b/t animal and org details
    if (searchType === 'animal') {
      api.animal(params)
        .then( ({data}) => {
          console.log(data.animal)
          this.setState({
            info: data.animal,
            isLoading: false
          })
        })
    }
    if (searchType === 'organization') {
      api.org(params)
        .then( ({data}) => {
          this.setState({
            info: data.organization,
            isLoading: false
          })
        })
    }
  }
  
  render() {
    const { info, isLoading } = this.state ;
    const { searchType } = this.props.match.params;

    if (isLoading) return <Loading/>
    return (
      <div>
        <Carousel photos={info.photos} />
        <section className={classnames(details.section)}>
          <Container restricted >
            <Row>
              { searchType === 'animal' ? <AnimalDetails info={info} /> : <ShelterDetails info={info} /> }
            </Row>
          </Container>
        </section>
      </div>
    )
  }
}

export default Details;