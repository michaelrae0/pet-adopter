import React from 'react'

import * as details from '../../pages/Details/details.module.scss'
import Container from '../Container'
import Row from '../Row'
import { H1, H2, SectionBody } from '../Typography'

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
    <section className={details.section}>
      <Container restricted >
        <Row className={details.row}>

          <div className={details.primary} >
            <H1 className={details.title} text={name} />
            <SectionBody className={details.statement} text={mission_statement} />
            <SectionBody text={adoption.policy} />
          </div>

          <div className={details.secondary}>
            <div className={details.info_type}>
              <H2 className={details.subtitle} text={`Contact Info`} />
              <div className={details.detail_group} >
                <SectionBody text={`Address: ${address.address1}, ${address.city}, ${address.state}`}/>
                <SectionBody text={`Phone: ${phone}`}/>
                <SectionBody text={`Email: ${email}`}/>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </section>
  )
}

export default ShelterDetails;