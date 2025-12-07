export function loadFooter(){
  const footer = document.querySelector("footer");
  footer.innerHTML = `
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} MovieRecs • Data from TMDB • Trailers via YouTube</p>
    </div>
  `;
}
