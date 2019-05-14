import React from 'react'
import queryString from 'query-string'

import * as details from './details.module.scss'
import api from '../../utils/apiClient'
import Loading from '../../Components/Loading'
import Carousel from '../../Components/Carousel'
import AnimalDetails from '../../Components/AnimalDetails'
import ShelterDetails from '../../Components/ShelterDetails'

export default class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {},
      isLoading: true,
    }
  }

  componentDidMount() {
    const searchParams = queryString.parse(this.props.location.search);
    const { category, id } = searchParams;

    const params = { id };

    // Choose b/t animal and org details
    if (category === 'animals') {
      api.animal(params)
        .then( ({data}) => {
          console.log('Animal details:')
          console.log(data.animal)
          this.setState({
            info: data.animal,
            isLoading: false
          })
        })
    }
    if (category === 'shelters') {
      api.org(params)
        .then( ({data}) => {
          console.log('Shelter details:')
          console.log(data.organization)
          this.setState({
            info: data.organization,
            isLoading: false
          })
        })
    }
  }
  
  render() {
    const { info, isLoading } = this.state ;
    const searchParams = queryString.parse(this.props.location.search);
    const { category } = searchParams;

    if (isLoading) return <Loading/>;

    return (
      <div className={details.page_wrapper}>
        <Carousel photos={info.photos} type={info.type ? info.type : 'Shelter'} />
        { category === 'animals' ? <AnimalDetails info={info} /> : <ShelterDetails info={info} /> }
      </div>
    )
  }
}