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
                display: grid;
                grid-template-areas: 
                ". . close"
                "img img img"
                "title title title"
                "userid userid id";
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
              
              #id {
                font-size: 1.5rem;
                grid-area: id;
              }

              #userid {
                font-size: 1.5rem;
                grid-area: userid;
              }
              
              #title {
                font-weight: bold;
                grid-area: title;
                font-size: 2rem;
              }

              #closeDialog {
                grid-area: close;
                max-width: max-content;
                place-self: stretch end;
                background: transparent;
                border: none;
                height: max-content;
                padding: 0;
                cursor: pointer;
                margin: 0.5rem 0;
                outline: none;
                transition: all 0.5s;
              }

              #closeDialog:hover {
                transform: scale(1.1);
              }

              #closeDialog img {
                margin: 0;
                padding:0;
                object-fit: contain;
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
              #image {
                grid-area: img;
                place-self: stretch center;
                max-inline-size: 100%;
                block-size: auto;
                object-fit: contain;
                height: 50vh;
              }

            </style>
            <dialog class="animate">
              <div id="id">ID: ${this.dataset.id}</div>
              <div id="userid">UserID: ${this.dataset.userId}</div>
              <div id="title" class="resp-img">Title: ${this.dataset.title}</div>
              <img id="image" loading="lazy">
            <button id="closeDialog"><img src="/assets/close.svg"></button>
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
