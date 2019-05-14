import React from 'react'

import * as details from '../../pages/Details/details.module.scss'
import Container from '../Container'
import Row from '../Row'
import { H2, SectionBody } from '../Typography'

const ShelterDetails = ({ info }) => {
  const {
    name,
    address,
    phone,
    email,
  } = info;

  const formattedAddress = address => {
    const cityState = `${address.city}, ${address.state}`;
    return address.address1 ? `${address.address1}, ${cityState}` : cityState;
  }
 
  return (
    <section className={details.section}>
      <Container className={details.container} restricted >
        <Row className={details.row} noMargin>

          <div className={details.header} >
            <H2 className={details.header__title} text={name} />   
          </div>

          <div className={details.content}>

            <div className={details.secondary}>
              <SectionBody className={details.secondary__subtitle} text={formattedAddress(address)}/>
              {phone && <SectionBody className={details.secondary__subtitle} text={`${phone}`} />}
              {email && <SectionBody 
                className={details.secondary__subtitle} 
                text={<a href={`mailto:${email}`} className={details.secondary__email} >{email}</a>} 
              />}
            </div>
          </div>
        </Row>
      </Container>
    </section>
  )
}

export default ShelterDetails;