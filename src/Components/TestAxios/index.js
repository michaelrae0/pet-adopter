import React from 'react'
import pf from 'petfinder-client'

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
      pets: [],
    }
  }

  componentDidMount() {
    console.log(petfinder)
    petfinder.pet
      .find({
        animal: 'dog'
      })
      .then(data => {
        console.log(data)
        this.setState({
          isLoading: false,
          pets: data.petfinder.pets.pet
        })
      })
  }
  render() {
    console.log(this.state.pets)
    const pets = this.state.pets;
    return (
      <div>
        {!this.state.isLoading && pets.map( (pet, i) => {
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
        })}
      </div>
    )
  }
}

export default TestAxios