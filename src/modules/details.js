import { getDetails } from "../api/tmdb.js";
import { findTrailerVideoId } from "../api/youtube.js";
import { addToWatchlist, getWatchlist } from "./watchlist.js";
import { openDetailsModal } from "../main.js";

export async function showDetails(id, type='movie'){
  try{
    const data = await getDetails(id, type);
    const trailerId = await findTrailerVideoId(data.title || data.name);
    const html = renderDetails(data, trailerId, type);
    openDetailsModal(html);

    // wire watchlist button inside modal
    setTimeout(()=>{ // modal content is inserted via openDetailsModal
      const btn = document.getElementById("add-watchlist-btn");
      if(btn){
        btn.addEventListener("click", ()=>{
          addToWatchlist({ id: data.id, title: data.title || data.name, poster_path: data.poster_path, type });
          btn.textContent = 'Added';
          btn.disabled = true;
        });

        // disable if already in watchlist
        const inList = getWatchlist().some(i=>String(i.id)===String(data.id));
        if(inList){ btn.textContent = 'Added'; btn.disabled = true; }
      }
    }, 50);

  }catch(err){
    console.error("Details error", err);
    openDetailsModal(`<div class="container"><p class="muted">Failed to load details.</p></div>`);
  }
}

function renderDetails(d, trailerId, type){
  const poster = d.poster_path ? `https://image.tmdb.org/t/p/w500${d.poster_path}` : '';
  const title = d.title || d.name || 'Untitled';
  const year = (d.release_date || d.first_air_date || '').slice(0,4);
  const overview = d.overview || 'No summary available.';
  const genres = (d.genres || []).map(g=>`<span class="badge">${g.name}</span>`).join(' ');
  const credits = d.credits?.cast?.slice(0,6).map(c=>c.name).join(', ') || '';

  const trailerEmbed = trailerId ? `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${trailerId}" frameborder="0" allowfullscreen></iframe>` : `<p class="muted">Trailer not available.</p>`;

  return `
    <div class="details-header">
      <img class="details-poster" src="${poster}" alt="${title} poster">
      <div class="details-meta">
        <h2>${title} ${year?`<small>(${year})</small>`:''}</h2>
        <div>${genres}</div>
        <p class="muted">${overview}</p>
        <p><strong>Cast:</strong> ${credits}</p>
        <div style="margin-top:.6rem">
          <button id="add-watchlist-btn" class="btn primary">Add to Watchlist</button>
        </div>
      </div>
    </div>

    <div style="margin-top:1rem">
      <h3>Trailer</h3>
      ${trailerEmbed}
    </div>
  `;
}
