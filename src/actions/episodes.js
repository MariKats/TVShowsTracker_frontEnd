import axios from 'axios';

export const CREATE_EPISODE = 'CREATE_EPISODE'
export const FETCH_EPISODES = 'FETCH_EPISODES'

export function fetchEpisodes(id) {
  const url = `https://api.tvmaze.com/shows/${id}/episodes`;
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
