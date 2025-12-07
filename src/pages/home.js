import { getTrending, getTopRated } from "../api/tmdb.js";
import { buildCard } from "../components/card.js";
import { openDetailsModal } from "../main.js";

const trendingGrid = document.getElementById("trending-grid");
const topratedGrid = document.getElementById("toprated-grid");
const heroPoster = document.getElementById("hero-poster");

document.addEventListener("DOMContentLoaded", initHome);

async function initHome(){
  try {
    const trend = await getTrending();
    renderList(trend.results.slice(0,8), trendingGrid);

    // hero show first trending
    const hero = trend.results?.[0];
    if(hero){
      const img = hero.backdrop_path ? `https://image.tmdb.org/t/p/w780${hero.backdrop_path}` : `https://image.tmdb.org/t/p/w500${hero.poster_path}`;
      heroPoster.style.background = `url(${img}) center/cover no-repeat`;
    }

    const top = await getTopRated('movie');
    renderList(top.results.slice(0,8), topratedGrid);
  } catch(err){
    console.error("Home init error", err);
  }
}

function renderList(items, container){
  container.innerHTML = "";
  items.forEach(item => {
    const card = buildCard(item, item.media_type || 'movie');
    container.appendChild(card);
  });
}

/* delegate click -> open details */
document.addEventListener("click", async (e)=>{
  const card = e.target.closest(".movie-card");
  if(!card) return;
  const id = card.dataset.id;
  const type = card.dataset.type || 'movie';
  // load details and show modal
  try{
    const mod = await import("../modules/details.js");
    mod.showDetails(id, type);
  }catch(err){
    console.error(err);
  }
});
