import axios from 'axios';

export const FETCH_SEASONS = 'FETCH_SEASONS'
export const FETCH_CREATED_SEASONS = 'FETCH_SEASONS'
export const CREATE_SEASON = 'CREATE_SEASON'
export const SET_SEASON_ID = 'SET_SEASON_ID'

export function fetchSeasons(id) {
  const url = `http://api.tvmaze.com/shows/${id}/seasons`;
  const request = axios.get(url);
  return {
    type: FETCH_SEASONS,
    payload: request
  };
}

export function createSeason(id, number, episodeOrder) {
  const url = `http://localhost:3000/api/v1/seasons`;
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
  const url = `http://localhost:3000/api/v1/seasons`;
  const request = axios.get(url);
  return {
    type: FETCH_CREATED_SEASONS,
    payload: request
  };
}

export function setSeasonId(id) {
  return {
    type: SET_SEASON_ID,
    payload: id
  };
}
