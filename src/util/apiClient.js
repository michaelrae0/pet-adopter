import axios from 'axios'

let config;

const api = {
  animals(params) {  // many animals
    const url = generateUrl(`https://api.petfinder.com/v2/animals`, params);
    return get(url, config)
  },
  animal(params) {  // single animal
    if (!params.id) throw "Enter an id!! Or use animals..";
    return this.animals(params);
  },


  types(params, breedsOnly = false) {  // many types
    const url = generateUrl(`https://api.petfinder.com/v2/types`, params, breedsOnly);
    return get(url, config)
  },
  breeds(params) { // types -> type -> breeds
    if (!params.type) throw "Enter a type!!";
    return this.types(params, true);
  },


  orgs(params) {  // many shelters
    const url = generateUrl(`https://api.petfinder.com/v2/organizations`, params);
    return get(url, config)
  },
  org(params) {  // single shelter
    if (!params.id) throw "Enter an id!! Or use orgs..";
    return this.orgs(params);
  },
};


function generateUrl(base, params, breedsOnly = false) {
  let url = base;

  // id
  if (params.id) {
    return url += `/${params.id}`;
  }

  // breeds
  if (breedsOnly) {
    return url += `/${params.type}/breeds`
  }

  // add params
  Object.getOwnPropertyNames(params).forEach( (param, i) => {
    if (i === 0) {
      url += '?';
    } else {
      url += '&';
    }

    url += `${param}=${params[param]}`
  })

  return url;
}

function get(url, config) {
  if (config) {
    return axios.get(url, {headers: config});
  }

  return authToken() // promise -> then -> return promise
    .then( ({data}) => {
      config = { Authorization: `Bearer ${data.access_token}` };
      return axios.get(url, {headers: config});
    });
}

function authToken() {
  // Returns a promise with bearer token. data.access_token
  return axios.post("https://api.petfinder.com/v2/oauth2/token", {
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_API_KEY,
      client_secret: process.env.REACT_APP_API_SECRET
    });
}

export default api;