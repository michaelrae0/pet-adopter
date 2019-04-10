import React from 'react'
import classnames from 'classnames'

import * as animalDetails from './animalDetails.module.scss'

class AnimalDetails extends React.Component {
  render() {
    const animal = this.props.info;
    const address = animal.contact.address;

    console.log(animal)

    return (
      <div className={classnames(animalDetails.text_cont)}>
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
    )
  }
}

export default AnimalDetails;