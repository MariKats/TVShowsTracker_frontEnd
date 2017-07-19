import axios from 'axios';

const EXT_URL = `https://api.tvmaze.com/`
// const ROOT_URL = `https://tvshowstracker-api.herokuapp.com`
const ROOT_URL = `http://localhost:3000`

export const FETCH_EPISODES = 'FETCH_EPISODES'
export const FETCH_CREATED_EPISODES = 'FETCH_CREATED_EPISODES'
export const CREATE_EPISODE = 'CREATE_EPISODE'
export const UPDATE_EPISODE = 'UPDATE_EPISODE'

export function fetchEpisodes(id) {
  const url = `${EXT_URL}shows/${id}/episodes`;
  const request = axios.get(url);
  return {
    type: FETCH_EPISODES,
    payload: request
  };
}

export function createEpisode(id, season_number, number, name, watched, time) {
  const url = `${ROOT_URL}/api/v1/episodes`;
  const request = axios({
    method: 'post',
    url: url,
    data: { season_id: id, season_number: season_number, number: number, name: name, watched: watched, time: time },
    headers: {
      'content-type': 'application/json'
    }
  })
  return {
    type: CREATE_EPISODE,
    payload: request
  };
}

export function updateEpisode(id, watched) {
  const url = `${ROOT_URL}/api/v1/episodes/${id}`;
  const request = axios({
    method: 'patch',
    url: url,
    data: { watched: watched},
    headers: {
      'content-type': 'application/json'
    }
  })
  return {
    type: UPDATE_EPISODE,
    payload: request
  };
}

export function fetchCreatedEpisodes() {
  const url = `${ROOT_URL}/api/v1/episodes`;
  const request = axios.get(url);
  return {
    type: FETCH_CREATED_EPISODES,
    payload: request
  };
}
