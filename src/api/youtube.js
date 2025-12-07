const YT_KEY = import.meta.env.VITE_YOUTUBE_KEY;
const YT_BASE = 'https://www.googleapis.com/youtube/v3/search';

export async function findTrailerVideoId(title){
  const q = encodeURIComponent(`${title} official trailer`);
  const url = `${YT_BASE}?part=snippet&maxResults=1&q=${q}&key=${YT_KEY}&type=video`;
  const res = await fetch(url);
  if(!res.ok) return null;
  const json = await res.json();
  return json.items?.[0]?.id?.videoId || null;
}
