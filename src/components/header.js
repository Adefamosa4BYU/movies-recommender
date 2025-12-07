export function loadHeader(){
  const header = document.querySelector("header");
  header.innerHTML = `
    <nav class="navbar container">
      <a class="logo" href="/">
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#e50914"/>
          <path d="M9 8l6 4-6 4z" fill="#fff"/>
        </svg>
        MovieRecs
      </a>

      <div class="nav-links" role="navigation">
        <a href="/">Home</a>
        <a href="/search.html">Search</a>
        <a href="/watchlist.html">Watchlist</a>
      </div>
    </nav>
  `;
}
