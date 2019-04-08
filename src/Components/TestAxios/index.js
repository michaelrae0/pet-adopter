import React from 'react'
import pf from 'petfinder-client'

import Loading from '../Loading/index'

const KEY = 'PNr2OgWKwwtzHKlxKIG8vAg50FLZ45q0yMI0iLkSjkotaWwQ2s';
const SECRET = '1lmETr7unZxwIMZh8aA7L5TjvJnMly9Zw0uzra12';

const petfinder = pf({
  key: KEY,
  secret: SECRET
});

class TestAxios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      ellipses: '.',
      pets: [],
    }
  }

  componentDidMount() {
    // api call
    petfinder.pet
      .find({
        animal: 'dog'
      })
      .then(data => {
        console.log(data)
        this.setState({
          isLoading: false,
          pets: data.petfinder.pets.pet,
        })
      })
  }

  render() {
    const { pets } = this.state;
    console.log(pets)
    console.log(this.state.ellipses)

    return (
      <div>
        { <Loading />}
        {/* {!this.state.isLoading && pets.map( (pet, i) => {
          return (
            <div key={pet.name}>
              <p>{i}</p>
              <p>{pet.name}</p>
              <p>{pet.breeds.breed}</p>
              <img 
                src={pet.media.photos.photo[0].value}
                alt='' 
              />
            </div>
          )
        })} */}
      </div>
    )
  }
}

export default TestAxios