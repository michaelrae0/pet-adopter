import React from 'react'
import classnames from 'classnames'

import * as search from './search.module.scss'

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      breed: '',
      location: '',
    }
  }
  
  componentDidMount() {
    
  }

  render() {
    console.log(this.state)
    return (
      <div className={classnames(search.container)}>
        <form
          action=''
          method='POST'
          onSubmit={this.submitForm}
        >
          <label htmlFor='type' >Type</label>
          <select 
            placeholder='Dog' type='select' name='type' id='type'
            className={classnames(search.form_info, search.type)}
            onChange={ e => this.setState({ type: e.target.value }) }
          >
            <option value='dog'>Dog</option>
            <option value='cat'>Cat</option>
            <option value='bird'>Bird</option>
            <option value='scales, fins, & other'>Fish & Reptiles</option>
            <option value='rabbit'>Rabbit</option>
            <option value='horse'>Horse</option>
            <option value='small & furry'>Small & Furry</option>
            <option value='barnyard'>Barnyard</option>
          </select>
          <label htmlFor='breed' >Breed</label>
          <select 
            placeholder='Boxer' type='select' name='breed' id='breed'
            className={classnames(search.form_info, search.breed)}
            value={this.state.breed}
            onChange={ e => this.setState({ breed: e.target.value }) }
          >
            <option value='Boxer' >Boxer</option>
          </select>
          <label htmlFor='location' >Location</label>
          <input
            placeholder='Atlanta, GA' type='text' name='location' id='location'
            className={classnames(search.form_info, search.location)}
            value={this.state.location}
            onChange={ e => this.setState({ location: e.target.value }) }
          />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default Search