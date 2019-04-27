import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as results from './results.module.scss'
import api from '../../util/apiClient.js'
import Container from '../../components/Container'
import Row from '../../components/Row'
import Loading from '../../components/Loading'
import Thumbnail from '../../components/Thumbnail'
import { H2 } from '../../components/Typography'
import { ReactComponent as DoubleArrowsSVG } from '../../images/DoubleArrows.svg'



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
    let locationState = {}
    if (!this.props.location.state) {
      locationState = {
        type: '',
        breed: '',
        location: '',
        distance: '',
      }
    }
    else locationState = this.props.location.state;

    const { type, breed, location, distance } = locationState;
    const { category, page } = this.props.match.params;
    
    let params = {};
    params['page'] = page;

    // Animals
    if (category === 'animals') {
      params['type'] = type ? type : ''
      params['breed'] = breed ? breed : ''
      if (location) params['location'] = location
  
      // Calls api for animal info
      api.animals(params)
        .then( ({ data }) => {
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
      if (location) {
        params['location'] = location
        params['distance'] = distance // requires location to be set
      }
  
      // Calls api for org info
      api.orgs(params)
        .then( ({ data }) => {
          this.setState({
            isLoading: false,
            orgs: data.organizations,
            pagination: data.pagination,
          })
        })
        .catch( e => console.log(e) )
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.id ===this.props.id) {

    }
  }

  render() {
    const { animals, orgs, pagination } = this.state;
    const { ...locationState } = this.props.location.state;
    const { category } = this.props.match.params;

    if (this.state.isLoading) return <Loading />;

    return (
      <section className={results.section}>
        <Container>
          <Row className={results.thumbnail_row} wrap>
            {category === 'animals' && 
            animals.map( animal => {
              const subtitles = [animal.breeds.primary, `${animal.contact.address.city}, ${animal.contact.address.state}`];
              return (
                <Thumbnail
                  category={category}
                  title={animal.name}
                  subtitles={subtitles}
                  image={animal.photos[0]}
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
                  image={org.photos[0]}
                  id={org.id}
                  key={org.id}
                />
              );
            })}
          </Row>
          <Row className={results.pagination_row}>

            {pagination.current_page > 1 && 
            <Link 
              to={{
                pathname: `/s/${category}/${+pagination.current_page - 1}`,
                state: {...locationState}
              }}
            >
              <DoubleArrowsSVG className={classnames(results.arrows, results.arrows__back)} />
            </Link>
            }
            {pagination.current_page === 1 &&
            <DoubleArrowsSVG className={classnames(results.arrows, results.arrows__back, results.arrows__inactive)} />
            }

            <div className={results.page_number} >
              <H2 text={`${pagination.current_page} of ${pagination.total_pages}`} />
            </div>

            <Link 
              to={{
                pathname: `/s/${category}/${+pagination.current_page + 1}`,
                state: { ...locationState },
              }}
              replace
            >
              <DoubleArrowsSVG className={classnames(results.arrows, results.arrows__next)} />
            </Link>

          </Row>
        </Container>
      </section>
    );
  }
}