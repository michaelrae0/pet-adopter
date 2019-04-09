import axios from 'axios'

function authToken() {
  // Returns a promise with bearer token. data.access_token
  return axios.post("https://api.petfinder.com/v2/oauth2/token", {
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_API_KEY,
      client_secret: process.env.REACT_APP_API_SECRET
    })
}

function generateUrl(base, params) {
  let url = base;
  Object.getOwnPropertyNames(params).forEach( (param, i) => {
    if (i === 0) url += '?';
    else url += '&';
    url += `${param}=${params[param]}`
  })
  return url;
}

const api = {
  getAnimals(params) {
    return authToken() // promise -> then -> return promise
      .then( ({data}) => {
        const url = generateUrl(`https://api.petfinder.com/v2/animals`, params);
        const config = { Authorization: `Bearer ${data.access_token}` };

        return axios.get(url, {headers: config})
      })
  }
}

export default api