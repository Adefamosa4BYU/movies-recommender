// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

import { loadHeader } from "./components/header.js";
import { loadFooter } from "./components/footer.js";

loadHeader();
loadFooter();

/* global modal behavior: open with `openDetailsModal(html)` and close when needed */
const modal = document.getElementById("details-modal");
const modalClose = document.getElementById("modal-close");

export function openDetailsModal(contentHTML){
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = contentHTML;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden","false");
  window.scrollTo({top:0,behavior:"smooth"});
}

export function closeDetailsModal(){
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden","true");
  document.getElementById("modal-content").innerHTML = "";
}

if(modalClose){
  modalClose.addEventListener("click", closeDetailsModal);
}
if(modal){
  modal.addEventListener("click", (e)=>{
    if(e.target === modal) closeDetailsModal();
  });
}
