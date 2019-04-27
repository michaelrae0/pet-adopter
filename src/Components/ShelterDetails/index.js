import React from 'react'

import * as shelterDetails from './shelterDetails.module.scss'

const ShelterDetails = ({ info }) => {
  const {
    name,
    mission_statement,
    adoption,
    address,
    phone,
    email,
  } = info;

  return (
    <div className={shelterDetails.text_cont}>
      <h2>{name}</h2>
      <p>{mission_statement}</p>
      <p>{adoption.policy}</p>
      <div>
        <h4>Contact Info</h4>
        <p>Address: {address.address1}, {address.city}, {address.state}</p>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  )
}

export default ShelterDetails;