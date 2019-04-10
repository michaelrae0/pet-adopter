import React from 'react'
import classnames from 'classnames'

import Loading from '../Loading/index'
import AnimalDetails from '../AnimalDetails/index'
import ShelterDetails from '../ShelterDetails/index'

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

    // const address = animal.contact.address;
    return (
      <div className={classnames(details.container)}>
        <div className={classnames(details.img_cont)}>
          <img src={info.photos[0].full} alt={info.name} />
        </div>
        {searchType === 'animal' && <AnimalDetails info={info} />}
        {searchType === 'organization' && <ShelterDetails info={info} />}
      </div>
    )
  }
}

export default Details;