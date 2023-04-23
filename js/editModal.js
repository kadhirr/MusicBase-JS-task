import { patchData } from "./dataHelpers.js";

class EditModal extends HTMLElement {
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
                /*padding: 5rem;*/
                display: grid;
                grid-template:
                ". close"
                "form .";
                grid-template-columns: 9fr 1fr;
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

              form {
                grid-area: form;
                display: grid;
                grid-template-areas:
                "labelid id"
                "labeluserid userid"
                "labeltitle title"
                "submit submit";
                gap: 1rem 2rem;
              }

              form label[for=userid] {
                grid-area: labeluserid;
                place-self: stretch end;

              }
              
              form label[for=id] {
                grid-area: labelid;
                place-self: stretch end;

              }
              
              form label[for=title] {
                grid-area: labeltitle;
                place-self: stretch end;
              }

              input[type="submit"] {
                grid-area: submit;
                place-self: end;
                width: 30%;
                background: transparent;
                border: 1px solid grey;
                transition: all 0.25s;
              }

              input[type="submit"]:hover {
                box-shadow: 1px 2px grey;
              }

              div input {
                border: 2px solid grey;
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
                transform: scale(1.1) rotate(90deg);
              }

            </style>
            <dialog class="animate">
            <button id="closeDialog"><img src="/assets/close.svg"></button>
              <form method="dialog">
              <label for="id">ID</label>
              <input type="number" id="id" disabled></input>
              <label for="userid">User ID</label>
              <input type="number" id="userid"></input>
              <label for="title">Title</label>
              <input type="text" id="title"></input>
              <input type="submit">
              </form>
          </dialog> `;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(container);

        // SET VALUES OF FORM ELEMENTS
        // console.log("this",new Map(this.dataset));
        shadowRoot.querySelector("input#id").value = this.dataset.id;
        shadowRoot.querySelector("input#userid").value = this.dataset.userid;
        shadowRoot.querySelector("input#title").value = this.dataset.title;

        // Fix for bug when scroll not restored after closing dialog with esc key
        shadowRoot.querySelector('dialog').addEventListener('close', (e) => {
            document.querySelector("body").classList.remove("overflow-hidden");
            document.querySelector('edit-modal').remove();
        })
        const closeBtn = shadowRoot.querySelector('#closeDialog');
        closeBtn.addEventListener('click', (e) => {
            shadowRoot.children[0].children[1].close();
            document.querySelector("body").classList.remove("overflow-hidden");
        });

        // SUBMIT FORM FUNCTIONALITY
        const submitBtn = shadowRoot.querySelector('input[type=submit]');
        console.log(submitBtn);
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("abc",shadowRoot.querySelector('input#id').value);
            const data = {
                id: parseInt(shadowRoot.querySelector('input#id').value),
                userId: parseInt(shadowRoot.querySelector('input#userid').value),
                title: shadowRoot.querySelector('input#title').value
            }
            console.log(data);
            
            // UPDATE AND FIRE CUSTOM EVENT
            const event = new CustomEvent("rebuild-table",{detail: {action: 'update', id: this.dataset.id}});

            patchData(data.id,data.userId,data.title);
            document.dispatchEvent(event);

            shadowRoot.children[0].children[1].close();
        }
        );
        }
    }

window.customElements.define("edit-modal", EditModal);

