import { createAlbum } from "./dataHelpers.js";

class CreateModal extends HTMLElement {
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
                padding: 5rem;
                min-height: content;
                min-width: 50vw;
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

              form div {
                display: grid;
              }

              button#closeDialog{
                background: transparent;
                border: 2px solid red;
                border-radius: 50%;
                position: absolute;
                right: 1rem;
                top: 0.5rem;
                text-align: center;
                cursor: pointer;
              }
            </style>
            <dialog class="animate">
            <button id="closeDialog">X</button>
              <form type="dialog">
              <div>
              <label for="userId">User ID</label>
              <input type="number" id="userId"></input>
              </div>
              <div>
                <label for="title">Title</label>
                <input type="text" id="title"></input>
              </div>
              <input type="submit">
              </form>
          </dialog> `;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(container);
        // Fix for bug when scroll not restored after closing dialog with esc key
        shadowRoot.querySelector('dialog').addEventListener('close', (e) => {
            document.querySelector("body").classList.remove("overflow-hidden");
            document.querySelector('create-modal').remove();
        })
        const closeBtn = shadowRoot.querySelector('#closeDialog');
        closeBtn.addEventListener('click', (e) => {
            shadowRoot.children[0].children[1].close();
            document.querySelector("body").classList.remove("overflow-hidden");
        });
        const submitBtn = shadowRoot.querySelector('input[type=submit]');
        // console.log(submitBtn);
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const data = {
                userId: parseInt(this.shadowRoot.querySelector('input#userId').value),
                title: this.shadowRoot.querySelector('input#title').value
            }
            const event = new CustomEvent("rebuild-table",{detail: {action: 'create'}});
            createAlbum(data.userId,data.title);
            document.dispatchEvent(event);
            shadowRoot.children[0].children[1].close();

        }
        );
        }
    }

window.customElements.define("create-modal", CreateModal);

