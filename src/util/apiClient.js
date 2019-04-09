import axios from 'axios'

const api = {
  animals(params, special = '') {  // many animals
    return authToken() // promise -> then -> return promise
      .then( ({data}) => {
        const url = generateUrl(`https://api.petfinder.com/v2/animals`, params, special);
        const config = { Authorization: `Bearer ${data.access_token}` };

        return axios.get(url, {headers: config});
      });
  },

  animal(params) {  // single animal
    if (!params.id) throw "Enter an id!! Or use animals..";
    return this.animals(params, params.id);
  },


  types(params) {  // many types
    return authToken()
      .then( ({data}) => {
        const url = generateUrl(`https://api.petfinder.com/v2/types`, params);
        const config = { Authorization: `Bearer ${data.access_token}` };

        return axios.get(url, {headers: config});
      });
  },


  orgs(params, special = '') {  // many shelters
    return authToken()
      .then( ({data}) => {
        const url = generateUrl(`https://api.petfinder.com/v2/organizations`, params, special);
        const config = { Authorization: `Bearer ${data.access_token}` };

        return axios.get(url, {headers: config});
      });
  },

  org(params) {  // single shelter
    if (!params.id) throw "Enter an id!! Or use orgs..";
    return this.orgs(params, params.id);
  },
};


function generateUrl(base, params, special = '') {
  let url = base;

  // id
  if (params.id) {
    return url += `/${params.id}`;
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


function authToken() {
  // Returns a promise with bearer token. data.access_token
  return axios.post("https://api.petfinder.com/v2/oauth2/token", {
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_API_KEY,
      client_secret: process.env.REACT_APP_API_SECRET
    });
}

export default api;