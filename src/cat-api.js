import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_lSP45qJboXs0myPfd64zyYCpokTAG1sCjUnayR76qb3jS4App2WwzyZsJljsTVRM';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(resp => resp.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(resp => resp.data[0]);
}
