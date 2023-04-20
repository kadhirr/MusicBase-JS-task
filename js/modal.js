export function defineCustomModal(){
    class Modal extends HTMLElement {
        constructor() {
          super();
        }
      
        connectedCallback() {
          this._render();
        }
      
        _render() {
          document.querySelector("body").classList.add("overflow-hidden");
          const container = document.createElement("div");
          container.innerHTML = `
            <style>
            dialog::backdrop {
                backdrop-filter: blur(1px);
                overscroll-behavior: contain;
                transition: backdrop-filter 0.5s ease;
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
              
              .animate {
                animation-name: animate-top;
                animation-duration: 0.4s;
              }

              ::slotted(h1:first-child) {
                color: red;
              }
            </style>
            <dialog class="animate">
            <slot name="id"></slot>
            <slot name="userid"></slot>
            <slot name="title"></slot>
            <button id="closeDialog">Close</button>
          </dialog> `;
          
          const shadowRoot = this.attachShadow({ mode: "open" });
          shadowRoot.appendChild(container);
          // Fix for bug when scroll not restored after closing dialog with esc key
          shadowRoot.querySelector('dialog').addEventListener('close',(e) => {
            document.querySelector("body").classList.remove("overflow-hidden");
          })
          const closeBtn = shadowRoot.querySelector('#closeDialog');
          closeBtn.addEventListener('click', (e)=>{
            shadowRoot.children[0].children[1].close();
            document.querySelector("body").classList.remove("overflow-hidden");
            document.querySelector('x-modal').remove();
          })
        }
      }
      window.customElements.define("x-modal", Modal);
}
