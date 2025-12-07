const KEY = 'movie_recs_watchlist';

export function getWatchlist(){ return JSON.parse(localStorage.getItem(KEY) || "[]"); }

export function addToWatchlist(item){
  const list = getWatchlist();
  if(!list.some(i=>i.id===item.id)){
    const itemClone = {...item, type: item.type || 'movie'};
    list.push(itemClone);
    localStorage.setItem(KEY, JSON.stringify(list));
  }
}

export function removeFromWatchlist(id){
  const list = getWatchlist();
  const filtered = list.filter(i=>String(i.id)!==String(id));
  localStorage.setItem(KEY, JSON.stringify(filtered));
}

export function clearWatchlist(){ localStorage.removeItem(KEY); }
