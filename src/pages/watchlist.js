import { buildCard } from "../components/card.js";
import { getWatchlist, removeFromWatchlist, clearWatchlist } from "../modules/watchlist.js";

const grid = document.getElementById("watchlist-grid");
const empty = document.getElementById("watchlist-empty");
const btnClear = document.getElementById("clear-watchlist");

document.addEventListener("DOMContentLoaded", renderWatchlist);
btnClear?.addEventListener("click", ()=>{
  clearWatchlist();
  renderWatchlist();
});

function renderWatchlist(){
  const list = getWatchlist();
  grid.innerHTML = "";
  if(!list.length){ empty.classList.remove("hidden"); return; }
  empty.classList.add("hidden");
  list.forEach(item => {
    const card = buildCard(item, item.type || 'movie');
    // add remove button overlay
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn';
    removeBtn.textContent = 'Remove';
    removeBtn.style.margin = '0.5rem';
    removeBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      removeFromWatchlist(item.id);
      renderWatchlist();
    });
    const body = card.querySelector('.card-body');
    body.appendChild(removeBtn);
    grid.appendChild(card);
  });
}

/* show details on card click */
document.addEventListener("click", async (e)=>{
  const card = e.target.closest(".movie-card");
  if(!card) return;
  const id = card.dataset.id, type = card.dataset.type || 'movie';
  const mod = await import("../modules/details.js");
  mod.showDetails(id, type);
});
