import React from 'react'

import * as details from '../../pages/Details/details.module.scss'
import Container from '../Container'
import Row from '../Row'
import { H2, SectionBody } from '../Typography'

const ShelterDetails = ({ info }) => {
  const {
    name,
    mission_statement,
    adoption,
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
            {(mission_statement || adoption.policy) && <div className={details.primary}>
              <SectionBody className={details.primary__subtitle} text={mission_statement} />
              <SectionBody className={details.primary__subtitle} text={adoption.policy} />
            </div>}

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