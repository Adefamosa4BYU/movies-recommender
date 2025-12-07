export function buildCard(item, type="movie"){
  const el = document.createElement("div");
  el.className = "movie-card";
  el.dataset.id = item.id;
  el.dataset.type = type;

  const posterPath = item.poster_path || item.backdrop_path;
  const imgUrl = posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '/public/assets/placeholder.png';

  el.innerHTML = `
    <img loading="lazy" src="${imgUrl}" alt="${escapeHtml(item.title || item.name)} poster">
    <div class="card-body">
      <h3>${escapeHtml(item.title || item.name)}</h3>
      <p>${(item.release_date||item.first_air_date||"").slice(0,4) || ''}</p>
    </div>
  `;

  return el;
}

/* tiny helper escape to avoid injection if you ever use uncontrolled data */
function escapeHtml(str = ''){
  return String(str).replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
}
