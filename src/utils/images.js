const fetchFallbackImage = type => {
  switch (type) {
    case 'Bird':
      return require('../images/fallbacks/bird-ph.png');
    case 'Barnyard':
      return require('../images/fallbacks/barnyard-ph.png');
    case 'Cat':
      return require('../images/fallbacks/cat-ph.png');
    case 'Dog':
      return require('../images/fallbacks/dog-ph.png');
    case 'Horse':
      return require('../images/fallbacks/horse-ph.png');
    case 'Rabbit':
      return require('../images/fallbacks/rabbit-ph.png');
    case 'Shelter':
      return require('../images/fallbacks/shelter-ph.png')

    case 'Scales, Fins & Other':
      return require('../images/fallbacks/fish-ph.png');
    case 'Small & Furry':
      return require('../images/fallbacks/small-ph.png');

    default:
      return require('../images/fallbacks/dog-ph.png');
  }
}

export {
  fetchFallbackImage,
}