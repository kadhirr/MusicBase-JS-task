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

            /* DISABLE THE ARROWS ON INPUT NUMBER */
            input[type=number]::-webkit-inner-spin-button, 
            input[type=number]::-webkit-outer-spin-button { 
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                margin: 0; 
            }

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
                margin: 1rem;
              }


              label {
                grid-row: 1;
                transform: translateY(20px);
                transition: 0.3s all;
              }

              input:focus + label {
                font-size: 0.8rem;
                transform: translateY(-5px);
              }

              input {
                grid-row: 2;
                border: none;
                border-bottom: 2px solid grey;
                outline: none;
                transition: 0.25s all;
              }

              input:focus {
                border: none;
                border-bottom: 2px solid black;
              }

              input[type="submit"] {
                margin: auto;
                width: 30%;
                background: transparent;
                border: 1px solid grey;
                transition: all 0.25s;
              }

              input[type="submit"]:hover {
                box-shadow: 1px 2px grey;
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
              <input type="number" id="userId"></input>
              <label for="userId">User ID</label>
              </div>
              <div>
                <input type="text" id="title"></input>
                <label for="title">Title</label>
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

