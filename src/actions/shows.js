import axios from 'axios';
export const FETCH_SEARCHED_SHOW = 'FETCH_SEARCHED_SHOW'
export const CLEAR_SEARCHED_SHOW = 'CLEAR_SEARCHED_SHOW'
export const CREATE_SHOW = 'CREATE_SHOW'
export const UPDATE_RATING = 'UPDATE_RATING'
export const FETCH_SHOWS = 'FETCH_SHOWS'
export const FETCH_SHOW = 'FETCH_SHOW'
export const DELETE_SHOW = 'DELETE_SHOW'
export const SET_ACTIVE_SHOW = 'SET_ACTIVE_SHOW'
const EXT_URL = `https://api.tvmaze.com/`
// const URL = `https://tvshowstracker-api.herokuapp.com`
const ROOT_URL = `http://localhost:3000`

export function fetchSearchedShow(show) {
  const url = `${EXT_URL}singlesearch/shows?q=${show}`;
  const request = axios.get(url);
  return {
    type: FETCH_SEARCHED_SHOW,
    payload: request
  };
}

export function createShow(name, image, tvmaze_id, callback) {
  const url = `${ROOT_URL}/api/v1/shows`;
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

export function fetchShows() {
  const url = `${ROOT_URL}/api/v1/shows`;
  const request = axios.get(url);
  return {
    type: FETCH_SHOWS,
    payload: request
  };
}

export function fetchShow(id) {
  const url = `${ROOT_URL}/api/v1/shows/${id}`;
  const request = axios.get(url);
  return {
    type: FETCH_SHOW,
    payload: request
  };
}

export function deleteShow(id, callback) {
  const url = `${ROOT_URL}/api/v1/shows/${id}`;
  axios.delete(url).then(()=>callback());
  return {
    type: DELETE_SHOW,
    payload: id
  };
}
export function updateRating(id, rating) {
  const url = `${ROOT_URL}/api/v1/shows/${id}`;
  const request = axios({
    method: 'patch',
    url: url,
    data: { rating: rating},
    headers: {
      'content-type': 'application/json'
    }
  })
  return {
    type: UPDATE_RATING,
    payload: request
  };
}

export function clearSearchedShow() {
  return {
    type: CLEAR_SEARCHED_SHOW,
  };
}

export function setActiveShow(id) {
  const url = `${ROOT_URL}/api/v1/shows/${id}`;
  const request = axios.get(url);
  return {
    type: SET_ACTIVE_SHOW,
    payload: request
  };
}
