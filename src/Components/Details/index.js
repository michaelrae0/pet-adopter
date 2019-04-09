import React from 'react'
import classnames from 'classnames'

import Loading from '../Loading/index'

import api from '../../util/apiClient'
import * as details from './details.module.scss'

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animal: {},

      isLoading: true,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id)

    const params = {
      id,
    }

    api.animals(params)
      .then( ({data}) => {
        console.log(data.animal)
        this.setState({
          animal: data.animal,
          isLoading: false
        })
      })
  }
  
  render() {
    const { animal, isLoading } = this.state 

    if (isLoading) return <Loading/>

    const address = animal.contact.address;
    return (
      <div className={classnames(details.container)}>
        <div className={classnames(details.img_cont)}>
          <img src={animal.photos[0].full} alt={animal.name} />
        </div>
        <div className={classnames(details.text_cont)}>
          <h2>{animal.name}</h2>
          <p>{animal.description}</p>
          <p>Breed: {animal.breed}</p>
          <p>Size: {animal.size}</p>
          <p>Hair: {animal.coat}</p>
          <p>Gender: {animal.gender}</p>
          <p>Status: {animal.status}</p>
          <div>
            <h4>Contact Info</h4>
            <p>Address: {address.address1}, {address.city}, {address.state}</p>
            <p>Phone: {animal.contact.phone}</p>
            <p>Email: {animal.contact.email}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Details;