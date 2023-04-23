import { deleteData } from "./dataHelpers.js";

class Toast extends HTMLElement {
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
        `
        <style>
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
          "close"
          "msg"
          "controls";
          padding: 2rem;
          min-height: content;
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

        #message {
          grid-area: msg;
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

        #controls {
          grid-area: controls;
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 1rem 0;
        }

        #controls button {
          background: transparent;
          height: max-content;
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.25s;
        }

        #confirm-action {
          border: 2px solid red;
        }

        #confirm-action:hover {
          box-shadow: 1px 1px 2px red;
          transform: scale(1.1);
        }

        #cancel-action:hover {
          transform: scale(1.1);
        }

        #cancel-action {
          border: 0.5px solid grey;
        }

        #title-content {
          text-decoration: underline;
          font-weight: bold;
        }
        </style>
        <dialog class="animate">
        <button id="closeDialog"><img src="/assets/close.svg"></button>
        <div id="message">
          Are you sure you want to delete <span id="title-content"></span>
        </div>
        <div id="controls">
          <button id="confirm-action">Yes</button>
          <button id="cancel-action">No</button>
        </div>

        </dialog>`;
  
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(container);
      // console.log(this.dataset);
      shadowRoot.querySelector('#title-content').innerText = this.dataset.title;
      // Fix for bug when scroll not restored after closing dialog with esc key
      shadowRoot.querySelector('dialog').addEventListener('close', (e) => {
        document.querySelector('toast-modal').remove();
        document.querySelector("body").classList.remove("overflow-hidden");

      });
      const closeBtn = shadowRoot.querySelector('#closeDialog');
      closeBtn.addEventListener('click', (e) => {
        shadowRoot.children[0].children[1].close();
      });

      // CONFIRM DELETE BUTTON EVENT LISTENER
      const confirmBtn = shadowRoot.querySelector('#confirm-action');
      confirmBtn.addEventListener('click', (e) => {
        const event = new CustomEvent("rebuild-table",{detail: {action: 'delete', id: this.dataset.id}});
        deleteData(this.dataset.id)
        document.dispatchEvent(event);
        shadowRoot.children[0].children[1].close();
      });

      shadowRoot.querySelector('#cancel-action').addEventListener('click',()=>{
        shadowRoot.children[0].children[1].close();
      })
    }
  }
  window.customElements.define("toast-modal", Toast);
  