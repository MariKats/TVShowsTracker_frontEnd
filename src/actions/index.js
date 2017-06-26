import axios from 'axios';

export const FETCH_SERIES = 'FETCH_SERIES'
const ROOT_URL = `http://api.tvmaze.com/singlesearch/shows?q=`

export function fetchSeries(show) {
  const url = `${ROOT_URL}${show}`;
  const request = axios.get(url);
  return {
    type: FETCH_SERIES,
    payload: request
  };
}
