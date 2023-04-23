import { getPhotoURL } from "./dataHelpers.js";
class ViewModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    document.querySelector("body").classList.add("overflow-hidden");
    const container = document.createElement("div");
    container.innerHTML =
      `<style>
            dialog::backdrop {
                backdrop-filter: blur(1px);
                overscroll-behavior: contain;
                transition: backdrop-filter 0.5s ease;
                width: 100%;
              }
              
              .overflow-hidden {
                overflow: hidden;
              }
              
              dialog {
                border: 0.5px solid grey;
                box-shadow: 2px 2px 2px aqua;
                margin: auto;
              }
              
              dialog[open] {
                opacity: 1;
                transition: all 1s;
              }
              
              dialog:not([open]) {
                pointer-events: none;
                opacity: 0;
              }
              
              
              @keyframes animate-top {
                from {
                      top:-100px; 
                      opacity:0
                  } 
                  to {
                      top:0; 
                      opacity:1
                  }
              }

              @keyframes animate-bottom {
                from {
                      transform: translateY(20vh);
                      opacity:0
                  } 
                  to {
                    transform: translateY(0);
                      opacity:1
                  }
              }


              .animate {
                animation-name: animate-bottom;
                animation-duration: 0.2s;
              }

              ::slotted(h1:first-child) {
                color: red;
              }
              img {
                max-inline-size: 100%;
                block-size: auto;
                object-fit: contain;
                height: 50vh;
              }
            </style>
            <dialog class="animate">
              <h1 id="id">ID: ${this.dataset.id}</h1>
              <h1 id="userid">UserID: ${this.dataset.userId}</h1>
              <h1 id="title" class="resp-img">Title: ${this.dataset.title}</h1>
              <img loading="lazy">
            <button id="closeDialog">Close</button>
          </dialog> `;
    // SET IMAGE SOURCE
    getPhotoURL(this.dataset.id)
    .then(r => {
      container.children[1].children[3].setAttribute('src',r);
    });
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(container);  

    // Fix for bug when scroll not restored after closing dialog with esc key
    shadowRoot.querySelector('dialog').addEventListener('close', (e) => {
      document.querySelector("body").classList.remove("overflow-hidden");
      document.querySelector('view-modal').remove();
    })
    const closeBtn = shadowRoot.querySelector('#closeDialog');
    closeBtn.addEventListener('click', (e) => {

      console.log("before", document.querySelector('view-modal'));
      shadowRoot.children[0].children[1].close();
      document.querySelector("body").classList.remove("overflow-hidden");
    })
  }
}
window.customElements.define("view-modal", ViewModal);
