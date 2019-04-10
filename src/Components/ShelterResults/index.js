import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import Loading from '../Loading/index'

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

    const photo = org => {
      if (org.photos[0]) return org.photos[0].medium;
      return 'http://placekitten.com/250/250'
    }

    const orgThumbnails = orgs.map( (org, i) => {
      
      return (
        <Link to={`/details/${'organization'}/${org.id}`} key={org.id}>
          <div
            className={classnames(shelterResults.thumbnail)}
          >
            <div className={classnames(shelterResults.thumb_image_cont)}>
              <img 
                src={photo(org)}
                alt={org.name}
                className={classnames(shelterResults.thumb_image)}
              />
            </div>
            <div className={classnames(shelterResults.thumb_text_cont)}>
              <p className={classnames(shelterResults.thumb_title)}>{org.name}</p>
              <p className={classnames(shelterResults.thumb_location)}>
                {`${org.address.city}, ${org.address.state}`}
              </p>
            </div>
          </div>
        </Link>
        // <div></div>
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