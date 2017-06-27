import axios from 'axios';

export const FETCH_SERIES = 'FETCH_SERIES'
export const CREATE_SHOW = 'CREATE_SHOW'
const ROOT_URL = `http://api.tvmaze.com/singlesearch/shows?q=`

export function fetchSeries(show) {
  const url = `${ROOT_URL}${show}`;
  const request = axios.get(url);
  return {
    type: FETCH_SERIES,
    payload: request
  };
}

export function createShow(name) {
  const url = 'http://localhost:3000/api/v1/shows';
  const show = JSON.stringify({name: name})
  const request = axios({
  method: 'post',
  url: url,
  data: { name: name },
  headers: {
    'content-type': 'application/json'
  }
});
  return {
    type: CREATE_SHOW,
    payload: request
  };
}
