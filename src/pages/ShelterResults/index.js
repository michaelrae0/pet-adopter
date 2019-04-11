import React from 'react'
import classnames from 'classnames'

import Loading from '../../Components/Loading/index'
import Thumbnail from '../../Components/Thumbnail/index'

import * as shelterResults from './shelterResults.module.scss'
import api from '../../util/apiClient.js'

class ShelterResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      orgs: [],
    }
  }

  componentDidMount() { 
    const { location, distance } = this.props.location.state;
    let params = {};

    if (location) {
      params['location'] = location
      params['distance'] = distance // requires location to be set
    }

    // Calls api for animal info
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

  render() {
    const { orgs } = this.state;

    const orgThumbnails = orgs.map( org => {
      const body = [`${org.address.city}, ${org.address.state}`]
      return (
        <Thumbnail
          images={org.photos[0]}
          header={org.name}
          body={body}
          id={org.id}
          key={org.id}
          category={'organization'}
        />
      )
    })

    return (
      <div className={classnames(shelterResults.container)}>

        {this.state.isLoading && <Loading />}
        {!this.state.isLoading && orgThumbnails}

      </div>
    )
  }
}

export default ShelterResults;