import axios from 'axios';

export const FETCH_SEARCHED_SHOW = 'FETCH_SEARCHED_SHOW'
export const CREATE_SHOW = 'CREATE_SHOW'
export const CREATE_SEASON = 'CREATE_SEASON'
export const FETCH_SHOWS = 'FETCH_SHOWS'
export const FETCH_SHOW = 'FETCH_SHOW'
export const DELETE_SHOW = 'DELETE_SHOW'
const ROOT_URL = `http://api.tvmaze.com/singlesearch/shows?q=`

export function fetchSearchedShow(show) {
  const url = `${ROOT_URL}${show}&embed=seasons`;
  const request = axios.get(url);
  return {
    type: FETCH_SEARCHED_SHOW,
    payload: request
  };
}

export function createShow(name, image, tvmaze_id, callback1, callback2) {
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
.then(() => callback1())
.then(() => callback2()) ;
  return {
    type: CREATE_SHOW,
    payload: request
  };
}

export function createSeason(number) {
  const url = `http://localhost:3000/api/v1/seasons`;
  const request = axios({
  method: 'post',
  url: url,
  data: { number },
  headers: {
    'content-type': 'application/json'
  }
})
  return {
    type: CREATE_SEASON,
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

export function deleteShow(id, callback) {
  const url = `http://localhost:3000/api/v1/shows/${id}`;
  axios.delete(url).then(()=>callback());
  return {
    type: DELETE_SHOW,
    payload: id
  };
}
