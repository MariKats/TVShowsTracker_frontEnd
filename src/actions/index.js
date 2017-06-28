import axios from 'axios';

export const FETCH_SEARCHED_SHOW = 'FETCH_SEARCHED_SHOW'
export const CREATE_SHOW = 'CREATE_SHOW'
export const FETCH_SHOWS = 'FETCH_SHOWS'
export const FETCH_SHOW = 'FETCH_SHOW'
const ROOT_URL = `http://api.tvmaze.com/singlesearch/shows?q=`

export function fetchSearchedShow(show) {
  const url = `${ROOT_URL}${show}`;
  const request = axios.get(url);
  return {
    type: FETCH_SEARCHED_SHOW,
    payload: request
  };
}

export function createShow(name, image, callback) {
  const url = 'http://localhost:3000/api/v1/shows';
  const request = axios({
  method: 'post',
  url: url,
  data: { name: name, image: image },
  headers: {
    'content-type': 'application/json'
  }
})
.then(()=> callback());
  return {
    type: CREATE_SHOW,
    payload: request
  };
}

export function fetchShows() {
  const url = 'http://localhost:3000/api/v1/shows';
  const request = axios.get(url);
  return {
    type: FETCH_SHOWS,
    payload: request
  };
}

export function fetchShow(id) {
  const url = `http://localhost:3000/api/v1/shows/${id}`;
  const request = axios.get(url);
  return {
    type: FETCH_SHOW,
    payload: request
  };
}
