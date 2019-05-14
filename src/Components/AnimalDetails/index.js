import React from 'react'
import titleCase from 'title-case'

import * as details from '../../pages/Details/details.module.scss'
import Container from '../Container'
import Row from '../Row'
import { H2, H4, SectionBody } from '../Typography'

const AnimalDetails = ({ info }) => {
  const {
    name,
    description,
    breeds,
    coat,
    gender,
    status,
    contact,
    age,
  } = info;

  const { city, state } = contact.address;

  const cityState = `${city}, ${state}`;

  const formattedBreed = breeds => {
    const breed = breeds.secondary ? `${breeds.primary} & ${breeds.secondary} Mix` : 
                  breeds.mixed     ? `${breeds.primary} Mix`                       : breeds.primary;
    return breed;
  }

  const formattedAge = (age, type) => {
    if (age === 'Baby') {
      switch (type) {
        case 'Dog':
          return 'Puppy';
        case 'Cat':
          return 'Kitten';
        default:
          return age;
      }
    }
    else return age;
  }

  const formattedCoat = (coat) => coat ? `${coat} Coat` : null;

  const Bullet = () => <span style={{ margin: '0 0.6rem' }}>•</span>;

  const bulletSeparatedLine = (...strings) => {
    return (
      <>
        {strings.map( (string, i) => {
          if (!string) return null;
          else return i === strings.length - 1 ? 
          <React.Fragment key={i}>{string}</React.Fragment> : 
          <React.Fragment key={i}>{string}<Bullet/></React.Fragment>
        })}
      </>
    )
  }

  return (
    <section className={details.section}>
      <Container className={details.container} restricted >
        <Row className={details.row} noMargin>
          <div className={details.header}>
            <H2 className={details.header__title} text={`Meet ${name}`} />
            <H4 className={details.header__subtitle} text={bulletSeparatedLine(formattedBreed(breeds), cityState)} bold/>
            <H4 className={details.header__content} text={bulletSeparatedLine(formattedAge(age, info.type), gender, formattedCoat(coat), titleCase(status))}/>
          </div>

          <div className={details.content}>

            <div className={details.secondary} >
              {contact.phone && <SectionBody className={details.secondary__subtitle} text={`${contact.phone}`} />}
              {contact.email && <SectionBody 
                className={details.secondary__subtitle} 
                text={<a href={`mailto:${contact.email}`} className={details.secondary__email} >{contact.email}</a>} 
              />}
            </div>
          </div>
        </Row>
      </Container>
    </section>
  )
}

export default AnimalDetails;