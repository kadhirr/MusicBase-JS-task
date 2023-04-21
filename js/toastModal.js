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
        ``;
  
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(container);
      // Fix for bug when scroll not restored after closing dialog with esc key
      shadowRoot.querySelector('dialog').addEventListener('close', (e) => {
        document.querySelector('toast-modal').remove();
      })
      const closeBtn = shadowRoot.querySelector('#closeDialog');
      closeBtn.addEventListener('click', (e) => {
        console.log("before", document.querySelector('toast-modal'));
        shadowRoot.children[0].children[1].close();
        document.querySelector("body").classList.remove("overflow-hidden");
      })
      setTimeout( () => {
        shadowRoot.children[0].children[1].close();
      },2000)
    }
  }
  // window.customElements.define("toast-modal", Toast);
  