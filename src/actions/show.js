import axios from 'axios';

export const FETCH_SHOWS = 'FETCH_SHOWS'
export const FETCH_SEARCHED_SHOW = 'FETCH_SEARCHED_SHOW'
export const CLEAR_SEARCHED_SHOW = 'CLEAR_SEARCHED_SHOW'
export const CREATE_SHOW = 'CREATE_SHOW'
export const FETCH_ACTIVE_SHOW = 'FETCH_ACTIVE_SHOW'
export const FETCH_SHOW = 'FETCH_SHOW'
export const DELETE_SHOW = 'DELETE_SHOW'

export function fetchShows() {
  const url = 'http://localhost:3000/api/v1/shows';
  const request = axios.get(url);
  return {
    type: FETCH_SHOWS,
    payload: request
  };
}

export function fetchSearchedShow(show) {
  const url = `http://api.tvmaze.com/singlesearch/shows?q=${show}`;
  const request = axios.get(url);
  return {
    type: FETCH_SEARCHED_SHOW,
    payload: request
  };
}

export function clearSearchedShow() {
  return {
    type: CLEAR_SEARCHED_SHOW,
  };
}

export function createShow(name, image, tvmaze_id, callback) {
  const url = 'http://localhost:3000/api/v1/shows';
  const request = axios({
  method: 'post',
  url: url,
  data: {
    name: name,
    image: image,
    tvmaze_id: tvmaze_id
 },
  headers: {
    'content-type': 'application/json'
  }
})
.then(() => callback());
  return {
    type: CREATE_SHOW,
    payload: request
  };
}

export function fetchActiveShow(id) {
  const url = `http://localhost:3000/api/v1/shows/${id}`;
  const request = axios.get(url);
  return {
    type: FETCH_ACTIVE_SHOW,
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

export function deleteShow(id, callback) {
  const url = `http://localhost:3000/api/v1/shows/${id}`;
  axios.delete(url).then(()=>callback());
  return {
    type: DELETE_SHOW,
    payload: id
  };
}
