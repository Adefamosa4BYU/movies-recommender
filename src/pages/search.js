import { search, getGenres } from "../api/tmdb.js";
import { buildCard } from "../components/card.js";
import { openDetailsModal } from "../main.js";

const form = document.getElementById("search-form");
const qInput = document.getElementById("query");
const resultsGrid = document.getElementById("results-grid");
const resultsEmpty = document.getElementById("results-empty");
const genreSelect = document.getElementById("genre-select");
const typeSelect = document.getElementById("type-select");

document.addEventListener("DOMContentLoaded", async ()=>{
  await populateGenres();
  const urlParams = new URLSearchParams(location.search);
  const q = urlParams.get('q') || "";
  if(q){
    qInput.value = q;
    doSearch(q);
  }
});

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  doSearch(qInput.value.trim());
});

async function populateGenres(){
  try{
    const js = await getGenres('movie');
    js.genres.forEach(g=>{
      const opt = document.createElement('option');
      opt.value = g.id; opt.textContent = g.name;
      genreSelect.appendChild(opt);
    });
  }catch(e){ console.warn("cannot load genres", e) }
}

async function doSearch(query){
  if(!query){ resultsGrid.innerHTML=""; resultsEmpty.classList.remove("hidden"); return; }
  resultsEmpty.classList.add("hidden");
  resultsGrid.innerHTML = `<p class="muted">Searching…</p>`;
  try{
    const type = typeSelect.value;
    const res = await search(query, type, 1);
    const items = res.results || [];
    if(items.length === 0){
      resultsGrid.innerHTML = "";
      resultsEmpty.classList.remove("hidden");
      return;
    }
    resultsGrid.innerHTML = "";
    items.forEach(it => resultsGrid.appendChild(buildCard(it,type)));
  }catch(err){
    resultsGrid.innerHTML = `<p class="muted">Error searching — check console.</p>`;
    console.error(err);
  }
}

/* delegate click */
document.addEventListener("click", async (e)=>{
  const card = e.target.closest(".movie-card");
  if(!card) return;
  const id = card.dataset.id;
  const type = card.dataset.type || typeSelect.value || 'movie';
  const mod = await import("../modules/details.js");
  mod.showDetails(id, type);
});
