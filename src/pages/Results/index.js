import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as results from './results.module.scss'
import api from '../../utils/apiClient.js'
import Container from '../../Components/Container'
import Row from '../../Components/Row'
import Loading from '../../Components/Loading'
import Thumbnail from '../../Components/Thumbnail'
import { H3 } from '../../Components/Typography'

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      animals: [],
      orgs: [],
      pagination: {
        current_page: 1,
        total_pages: 20,
      },
    }
  }
  static defaultProps = {
    location: {
      type: '',
      breed: '',
      location: '',
      distance: '',
    }
  }

  componentDidMount() {
    const { type, breed, zip, page } = this.props.match.params;

    let params = {
      limit: 16,
      page: page ? page : 1,
    };
    if (/^\d{5}$/.test(zip)) {
      params['location'] = zip
      params['distance'] = 20 //radius
    }

    // Animals
    if (type !== 'shelters') {
      params['type']  = type !== 'all' ? type : ''
      if (breed) params['breed'] = breed !== 'all' ? breed : ''
  
      // Calls api for animal info
      api.animals(params)
        .then( ({ data }) => {
          console.log('Pagination')
          console.log(data.pagination)
          console.log('Animal results')
          console.log(data.animals)
          this.setState({
            isLoading: false,
            animals: data.animals,
            pagination: data.pagination,
          })
        })
        .catch( e => console.log(e) );
    }
    // Shelters
    else {
      // Calls api for org info
      api.orgs(params)
        .then( ({ data }) => {
          console.log('Pagination')
          console.log(data.pagination)
          console.log('Shelter results')
          console.log(data.organizations)
          this.setState({
            isLoading: false,
            orgs: data.organizations,
            pagination: data.pagination,
          })
        })
        .catch( e => console.log(e) )
    }
  }

  // [...Array(8).keys] => [0, 1, 2, 3, 4, 5, 6, 7]; keys iterates over array and returns indexes
  generatePages = (startAt = 5, endAt = 100) => {
    const maxAdjacentPages = 4;
    const leadingPages = Math.min(startAt - 1, maxAdjacentPages);
    const trailingPages = Math.min(endAt - startAt, maxAdjacentPages);

    return [...Array(1 + leadingPages + trailingPages).keys()].map(i => i + startAt - leadingPages)
  }

  render() {
    const { animals, orgs, pagination } = this.state;
    const { type, breed, zip } = this.props.match.params;
    const category = type === 'shelters' ? 'shelters' : 'animals' 

    if (this.state.isLoading) return <Loading />;

    return (
      <section className={results.section}>
        <Container className={results.container}>
          <Row className={results.grid__row} >
            <div className={results.grid}>
              {category === 'animals' && 
              animals.map( animal => {
                const subtitles = [animal.breeds.primary, `${animal.contact.address.city}, ${animal.contact.address.state}`];
                return (
                  <Thumbnail
                    category={category}
                    title={animal.name}
                    subtitles={subtitles}
                    images={animal.photos}
                    id={animal.id}
                    key={animal.id}
                  />
                );
              })}
              {category === 'shelters' && 
              orgs.map( org => {
                const subtitles = [`${org.address.city}, ${org.address.state}`];
                return (
                  <Thumbnail
                    category={category}
                    title={org.name}
                    subtitles={subtitles}
                    images={org.photos}
                    id={org.id}
                    key={org.id}
                  />
                );
              })}
            </div>
          </Row>
          <Row className={results.pages__row}>
            
            <div className={results.pages} >
              {this.generatePages(pagination.current_page, Math.min(pagination.total_pages, 10000)).map( i => {
                return (
                  <Link
                    className={classnames(results.pages__page_btn, {[results.pages__page_btn__active]: i === pagination.current_page})}
                    to={{ pathname: `/search/${type}/${breed ? breed : 'all'}/${zip ? zip : 'defaultlocation'}/${i}` }}
                    key={i}
                  >
                    <H3 className={results.pages__page_text} text={i} bold />
                  </Link>
                )
              })}
            </div>
            
            <Link
              className={results.pages__next_btn}
              to={{ pathname: `/search/${type}/${breed ? breed : 'all'}/${zip ? zip : 'defaultlocation'}/${+pagination.current_page + 1}` }}
            >
              <H3 className={results.pages__next_text} text='Next' bold />
            </Link>

          </Row>
        </Container>
      </section>
    );
  }
}