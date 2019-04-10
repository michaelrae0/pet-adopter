import React from 'react'
import classnames from 'classnames'

import * as shelterDetails from './shelterDetails.module.scss'

class ShelterDetails extends React.Component {
  render() {
    const org = this.props.info;

    console.log(org)

    return (
      <div className={classnames(shelterDetails.text_cont)}>
        <h2>{org.name}</h2>
        <p>{org.mission_statement}</p>
        <p>{org.adoption.policy}</p>
        <div>
          <h4>Contact Info</h4>
          <p>Address: {org.address.address1}, {org.address.city}, {org.address.state}</p>
          <p>Phone: {org.phone}</p>
          <p>Email: {org.email}</p>
        </div>
      </div>
    )
  }
}

export default ShelterDetails;