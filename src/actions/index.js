import axios from 'axios';

export const FETCH_SEARCHED_SHOW = 'FETCH_SEARCHED_SHOW'
export const FETCH_CREATED_SEASONS = 'FETCH_CREATED_SEASONS'
export const CLEAR_SEARCHED_SHOW = 'CLEAR_SEARCHED_SHOW'
export const CREATE_SHOW = 'CREATE_SHOW'
export const CREATE_SEASON = 'CREATE_SEASON'
export const CREATE_EPISODE = 'CREATE_EPISODE'
export const UPDATE_EPISODE = 'UPDATE_EPISODE'
export const FETCH_SHOWS = 'FETCH_SHOWS'
export const FETCH_SEASONS = 'FETCH_SEASONS'
export const FETCH_EPISODES = 'FETCH_EPISODES'
export const FETCH_SHOW = 'FETCH_SHOW'
export const DELETE_SHOW = 'DELETE_SHOW'
const ROOT_URL = `http://api.tvmaze.com/`

export function fetchSearchedShow(show) {
  const url = `${ROOT_URL}singlesearch/shows?q=${show}`;
  const request = axios.get(url);
  return {
    type: FETCH_SEARCHED_SHOW,
    payload: request
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

export function fetchSeasons(id) {
  const url = `${ROOT_URL}shows/${id}/seasons`;
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

export function fetchEpisodes(id) {
  const url = `${ROOT_URL}shows/${id}/episodes`;
  const request = axios.get(url);
  return {
    type: FETCH_EPISODES,
    payload: request
  };
}

export function createEpisode(id, season_number, number, name) {
  const url = `http://localhost:3000/api/v1/episodes`;
  const request = axios({
    method: 'post',
    url: url,
    data: { season_id: id, season_number: season_number, number: number, name: name },
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
  const url = `http://localhost:3000/api/v1/episodes/${id}`;
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

export function clearSearchedShow() {
  return {
    type: CLEAR_SEARCHED_SHOW,
  };
}
