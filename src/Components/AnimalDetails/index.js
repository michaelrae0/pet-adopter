import React from 'react'

import * as animalDetails from './animalDetails.module.scss'

const AnimalDetails = ({ info }) => {
  const {
    name,
    description,
    breed,
    size,
    coat,
    gender,
    status,
    contact,
  } = info;
  const {
    address1,
    city,
    state,
  } = contact.address;

  return (
    <div className={animalDetails.text_cont}>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Breed: {breed}</p>
      <p>Size: {size}</p>
      <p>Hair: {coat}</p>
      <p>Gender: {gender}</p>
      <p>Status: {status}</p>
      <div>
        <h4>Contact Info</h4>
        <p>Address: {address1}, {city}, {state}</p>
        <p>Phone: {contact.phone}</p>
        <p>Email: {contact.email}</p>
      </div>
    </div>
  )
}

export default AnimalDetails;