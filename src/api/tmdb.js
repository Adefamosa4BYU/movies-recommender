const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = "https://api.themoviedb.org/3";

function buildUrl(path, params = {}){
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([k,v]) => { if(v != null) url.searchParams.set(k,v) });
  return url.toString();
}

export async function fetchJSON(path, params){
  const url = buildUrl(path, params);
  const res = await fetch(url);
  if(!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}

export function getTrending() { return fetchJSON('/trending/all/week'); }
export function getTopRated(type='movie') { return fetchJSON(`/${type}/top_rated`, {language:'en-US', page:1}); }
export function search(query, type='movie', page=1) {
  const path = type === 'movie' ? '/search/movie' : '/search/tv';
  return fetchJSON(path, {query, page, language:'en-US', include_adult:false});
}
export function getDetails(id, type='movie', appendToResponse='credits,videos,similar') {
  return fetchJSON(`/${type}/${id}`, {append_to_response: appendToResponse, language:'en-US'});
}
export function getGenres(type='movie'){ return fetchJSON(`/genre/${type}/list`, {language:'en-US'}); }
