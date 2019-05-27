import React from 'react'
import classnames from 'classnames'
import phoneFormatter from 'phone-formatter'

import * as details from '../../pages/Details/details.module.scss'
import Container from '../Container'
import Row from '../Row'
import { H1, H4 } from '../Typography'

const ShelterDetails = ({ info }) => {
  const {
    name,
    address,
    phone,
    email,
  } = info;

  const formattedAddress = address => {
    return `${address.city}, ${address.state}`;
  }
  
  const formattedPhoneNumbers = numbers => {
    const formattedPhones = numbers.split(',').map( number => phoneFormatter.format(number.trim(), "(NNN) NNN-NNNN") )
    return formattedPhones.join(', ');
  }
 
  return (
    <section className={details.section}>
      <Container className={details.container} restricted >
        <Row className={details.row} noMargin>

          <div className={details.header} >
            <H1 className={classnames(details.header__title, {[details.header__title__reduced_margin]: true})} text={name} />   
          </div>

          <div className={details.content}>

            <div className={details.secondary}>
              <H4 className={details.secondary__subtitle} text={formattedAddress(address)}/>
              {phone && <H4 className={details.secondary__subtitle} text={`${formattedPhoneNumbers(phone)}`} />}
              {email && <H4 
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