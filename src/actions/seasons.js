import axios from 'axios';

const EXT_URL = `https://api.tvmaze.com/`
// const ROOT_URL = `https://tvshowstracker-api.herokuapp.com`
const ROOT_URL = `http://localhost:3000`


export const FETCH_SEASONS = 'FETCH_SEASONS'
export const FETCH_CREATED_SEASONS = 'FETCH_CREATED_SEASONS'
export const CREATE_SEASON = 'CREATE_SEASON'

export function fetchSeasons(id) {
  const url = `${EXT_URL}shows/${id}/seasons`;
  const request = axios.get(url);
  return {
    type: FETCH_SEASONS,
    payload: request
  };
}

export function createSeason(id, number, episodeOrder, watched) {
  const url = `${ROOT_URL}/api/v1/seasons`;
  const request = axios({
    method: 'post',
    url: url,
    data: { number: number, show_id: id, number_of_episodes: episodeOrder },
    headers: {
      'content-type': 'application/json'
    }
  })
  return {
    type: CREATE_SEASON,
    payload: request
  };
}

export function fetchCreatedSeasons() {
  const url = `${ROOT_URL}/api/v1/seasons`;
  const request = axios.get(url);
  return {
    type: FETCH_CREATED_SEASONS,
    payload: request
  };
}
