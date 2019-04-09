import React from 'react'
import classnames from 'classnames'
import axios from 'axios'

import Loading from '../Loading/index'

import * as results from './results.module.scss'

const key = process.env.REACT_APP_API_KEY;
const secret = process.env.REACT_APP_API_SECRET;

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      animals: [],
    }
  }

  componentDidMount() { 
    // Request with key and secret in header.
    // Response gives a bearer token. 1 hr expiry.
    const authToken = axios.post("https://api.petfinder.com/v2/oauth2/token", {
      grant_type: "client_credentials",
      client_id: key,
      client_secret: secret
    })
    
    
    authToken.then( ({ data }) => {
        const url = `https://api.petfinder.com/v2/animals?type=dog&page=2`
        const config = { Authorization: `Bearer ${data.access_token}` };

        axios.get(url, {headers: config})
          .then( ({ data }) => {
            console.log(data)

            this.setState({
              animals: data.animals,
              isLoading: false,
            })
          })
        }
    )
  }

  render() {
    const { animals } = this.state;

    return (
      <div className={classnames(results.container)}>

        {this.state.isLoading && <Loading />}
        {!this.state.isLoading && animals.map( (animal, i) => {
          return (
            <div
              key={animal.id}
              className={classnames(results.preview)}
            >
              <img 
                src={animal.photos[0].medium || 'https://placekitten.com/250/250'}
                alt={animal.name}
                className={classnames(results.thumbnail)}
              />
              <p>{i + 1}</p>
              <p>{animal.name}</p>
              <p>{`${animal.contact.address.city}, ${animal.contact.address.state}`}</p>

            </div>
          )
        })}

      </div>
    )
  }
}

export default Results;