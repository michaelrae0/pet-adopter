import React from 'react'
import classnames from 'classnames'

import * as details from './details.module.scss'
import api from '../../util/apiClient'
import Container from '../../components/Container'
import Row from '../../components/Row'
import Loading from '../../components/Loading'
import Carousel from '../../components/Carousel'
import AnimalDetails from '../../components/AnimalDetails'
import ShelterDetails from '../../components/ShelterDetails'

export default class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {},
      isLoading: true,
    }
  }

  componentDidMount() {
    const { id, searchType } = this.props.match.params;

    const params = { id };

    // Choose b/t animal and org details
    if (searchType === 'animals') {
      api.animal(params)
        .then( ({data}) => {
          console.log(data.animal)
          this.setState({
            info: data.animal,
            isLoading: false
          })
        })
    }
    if (searchType === 'shelters') {
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

    if (isLoading) return <Loading/>;

    return (
      <div>
        <Carousel photos={info.photos} />
        { searchType === 'animals' ? <AnimalDetails info={info} /> : <ShelterDetails info={info} /> }
      </div>
    )
  }
}