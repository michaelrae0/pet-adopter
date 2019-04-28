import React from 'react'

import * as details from '../../pages/Details/details.module.scss'
import Container from '../Container'
import Row from '../Row'
import { H1, H2, H3, H4 , H5 , H6, SectionBody } from '../Typography'

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
    <section className={details.section}>
      <Container restricted >
        <Row className={details.row}>
          <div className={details.primary}>
            <H1 className={details.name} text={`Meet ${name}`} />
            <SectionBody className={details.description} text={description} />
          </div>

          <div className={details.secondary}>

            <div className={details.info_type} >
              <H2 className={details.subtitle} text={`Personal Info`} />
              <div className={details.detail_group} >
                <SectionBody text={`Breed: ${breed}`} />
                <SectionBody text={`Size: ${size}`} />
                <SectionBody text={`Hair: ${coat}`} />
                <SectionBody text={`Gender: ${gender}`} />
                <SectionBody text={`Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`} />
              </div>
            </div>

            <div className={details.info_type} >
              <H2 className={details.subtitle} text={`Contact Info`} />
              <div className={details.detail_group} >
                <SectionBody text={`Address: ${address1}, ${city}, ${state}`} />
                <SectionBody text={`Phone: ${contact.phone}`} />
                <SectionBody text={`Email: ${contact.email}`} />
              </div>
            </div>

          </div>
        </Row>
      </Container>
    </section>
  )
}

export default AnimalDetails;