(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();async function x(t=""){const o=JSON.parse(localStorage.getItem("config")).baseURL+"albums/",e=await fetch(o+t);return e.status===200?{status:"ok",payload:await e.json()}:{status:"err"}}function q(t,o,e){if(t===null||e==null||o==null)return{status:"err"};let n=JSON.parse(localStorage.getItem("data"));for(let a=0;a<n.payload.length;a++)if(n.payload[a].id==t){n.payload[a]={id:t,title:e,userId:o},localStorage.setItem("data",JSON.stringify(n));break}}function E(t){if(t===null)return{status:"err"};let o=JSON.parse(localStorage.getItem("data"));for(let e=0;e<o.payload.length;e++)if(o.payload[e].id==t){o.payload.splice(e,1),localStorage.setItem("data",JSON.stringify(o));break}}async function L(t){return await fetch(JSON.parse(localStorage.getItem("config")).baseURL+`albums/${t}/photos`).then(e=>e.json()).then(e=>e[0].url)}function I(t,o){if(o==null||t==null)return{status:"err"};let e=JSON.parse(localStorage.getItem("data")),a={id:Math.max(...e.payload.map(r=>r.id))+1,userId:t,title:o};e.payload.push(a),localStorage.setItem("data",JSON.stringify(e))}class k extends HTMLElement{constructor(){super()}connectedCallback(){this._render()}_render(){document.querySelector("body").classList.add("overflow-hidden");const o=document.createElement("div");o.innerHTML=`
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

        </dialog>`;const e=this.attachShadow({mode:"open"});e.appendChild(o),e.querySelector("#title-content").innerText=this.dataset.title,e.querySelector("dialog").addEventListener("close",r=>{document.querySelector("toast-modal").remove(),document.querySelector("body").classList.remove("overflow-hidden")}),e.querySelector("#closeDialog").addEventListener("click",r=>{e.children[0].children[1].close()}),e.querySelector("#confirm-action").addEventListener("click",r=>{const d=new CustomEvent("rebuild-table",{detail:{action:"delete",id:this.dataset.id}});E(this.dataset.id),document.dispatchEvent(d),e.children[0].children[1].close()}),e.querySelector("#cancel-action").addEventListener("click",()=>{e.children[0].children[1].close()})}}window.customElements.define("toast-modal",k);class C extends HTMLElement{constructor(){super()}connectedCallback(){this._render()}_render(){document.querySelector("body").classList.add("overflow-hidden");const o=document.createElement("div");o.innerHTML=`<style>
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
                "img"
                "title"
                "userid"
                "id";
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
                place-self: stretch start;
              }

              #userid {
                font-size: 1.5rem;
                grid-area: userid;
                place-self: center start;
              }
              
              #title {
                font-weight: bold;
                place-self: center stretch;
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
                transform: scale(1.1) rotate(90deg);
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
          </dialog> `,L(this.dataset.id).then(a=>{o.children[1].children[3].setAttribute("src",a)});const e=this.attachShadow({mode:"open"});e.appendChild(o),e.querySelector("dialog").addEventListener("close",a=>{document.querySelector("body").classList.remove("overflow-hidden"),document.querySelector("view-modal").remove()}),e.querySelector("#closeDialog").addEventListener("click",a=>{e.children[0].children[1].close(),document.querySelector("body").classList.remove("overflow-hidden")})}}window.customElements.define("view-modal",C);class O extends HTMLElement{constructor(){super()}connectedCallback(){this._render()}_render(){document.querySelector("body").classList.add("overflow-hidden");const o=document.createElement("div");o.innerHTML=`<style>

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
          </dialog> `;const e=this.attachShadow({mode:"open"});e.appendChild(o),e.querySelector("dialog").addEventListener("close",r=>{document.querySelector("body").classList.remove("overflow-hidden"),document.querySelector("create-modal").remove()}),e.querySelector("#closeDialog").addEventListener("click",r=>{e.children[0].children[1].close(),document.querySelector("body").classList.remove("overflow-hidden")}),e.querySelector("input[type=submit]").addEventListener("click",r=>{r.preventDefault();const d={userId:parseInt(this.shadowRoot.querySelector("input#userId").value),title:this.shadowRoot.querySelector("input#title").value},s=new CustomEvent("rebuild-table",{detail:{action:"create"}});I(d.userId,d.title),document.dispatchEvent(s),e.children[0].children[1].close()})}}window.customElements.define("create-modal",O);class D extends HTMLElement{constructor(){super()}connectedCallback(){this._render()}_render(){document.querySelector("body").classList.add("overflow-hidden");const o=document.createElement("div");o.innerHTML=`<style>

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
                padding: 1rem;
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

              input {
                border: none;
                border-bottom: 2px solid grey;
                outline: none;
                transition: 0.25s all;
              }

              input:focus {
                border: none;
                border-bottom: 2px solid black;
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
          </dialog> `;const e=this.attachShadow({mode:"open"});e.appendChild(o),e.querySelector("input#id").value=this.dataset.id,e.querySelector("input#userid").value=this.dataset.userid,e.querySelector("input#title").value=this.dataset.title,e.querySelector("dialog").addEventListener("close",r=>{document.querySelector("body").classList.remove("overflow-hidden"),document.querySelector("edit-modal").remove()}),e.querySelector("#closeDialog").addEventListener("click",r=>{e.children[0].children[1].close(),document.querySelector("body").classList.remove("overflow-hidden")}),e.querySelector("input[type=submit]").addEventListener("click",r=>{r.preventDefault();const d={id:parseInt(e.querySelector("input#id").value),userId:parseInt(e.querySelector("input#userid").value),title:e.querySelector("input#title").value},s=new CustomEvent("rebuild-table",{detail:{action:"update",id:this.dataset.id}});q(d.id,d.userId,d.title),document.dispatchEvent(s),e.children[0].children[1].close()})}}window.customElements.define("edit-modal",D);document.addEventListener("rebuild-table",t=>{if(i=JSON.parse(localStorage.getItem("data")),document.querySelector("#search").value,t.detail.action=="delete"&&document.querySelector(`td[data-id="${t.detail.id}"]`).parentElement.remove(),t.detail.action=="update"){const o=i.payload.filter(a=>a.id==t.detail.id)[0],e=document.querySelector(`td[data-id="${t.detail.id}"]`).parentElement;e.children[1].innerText=o.userId,e.children[2].innerText=o.title;const n=document.querySelector("#search").value;S(n),h(l.sortCol.name)}});var i=null;let l=localStorage.getItem("config")!==null?JSON.parse(localStorage.getItem("config")):{baseURL:"https://jsonplaceholder.typicode.com/",sortCol:{name:"ID",ascOrder:!0},options:{autoload:!1,autosort:!1},idStore:{ID:0,"User ID":1,Title:2}};localStorage.setItem("config",JSON.stringify(l));function T(){document.querySelector("tbody").children.length==i.payload.length&&document.querySelector("#btn-load-more").remove()}async function N(){i=await x()}function B(){const t=document.querySelector("#loading");t.classList.remove("display"),t.style.display="none",document.getElementById("myContainer").style.display="block"}async function g(){i===null&&localStorage.getItem("data")!==null&&(i=JSON.parse(localStorage.getItem("data"))),i===null&&(await N(),localStorage.setItem("data",JSON.stringify(i))),document.querySelector("tbody").childElementCount==0&&B();const t=i;if(t.status=="ok"&&t!==void 0){document.querySelector("table");const o=document.querySelector("tbody"),e=o.children.length,n=i.payload.length-e>20?20:i.payload.length-e;for(let a=e;a<e+n;a++){const r=document.createElement("tr"),d=[t.payload[a].id,t.payload[a].userId,t.payload[a].title];for(const w of d){const y=document.createElement("td");y.dataset.id=t.payload[a].id,y.appendChild(document.createTextNode(w)),r.appendChild(y)}const s=document.createElement("td");s.classList.add("actions");const c=document.createElement("span"),u=document.createElement("span"),m=document.createElement("span");c.appendChild(document.createTextNode("visibility")),u.appendChild(document.createTextNode("edit")),m.appendChild(document.createTextNode("delete")),c.dataset.id=t.payload[a].id,u.dataset.id=t.payload[a].id,m.dataset.id=t.payload[a].id,c.classList.add("material-symbols-outlined"),u.classList.add("material-symbols-outlined"),m.classList.add("material-symbols-outlined"),c.addEventListener("click",J),u.addEventListener("click",H),m.addEventListener("click",P),s.append(c,u,m),r.appendChild(s),o.appendChild(r)}}l.options.autosort&&l.sortCol.name!==null&&h(l.sortCol.name),T()}function M(){document.getElementById("myContainer").style.display="none",document.getElementById("loading").classList.add("display"),g()}M();document.querySelector("#btn-load-more").addEventListener("click",t=>{g()});const p=new IntersectionObserver(t=>{t[0].intersectionRatio<=.75||document.querySelector("tbody").childElementCount!=i.payload.length&&g()},{root:null,rootMargin:"0px",threshold:[1]}),R=document.querySelector("table"),A={attributes:!0,childList:!0,subtree:!0},U=(t,o)=>{const e=document.querySelector("tr:nth-last-child(22)");e!==null&&p.unobserve(e);const n=document.querySelector("tr:nth-last-child(2)");p.observe(n)},f=new MutationObserver(U);function b(){p.disconnect();const t=document.querySelector("tr:nth-last-child(2)");p.observe(t),f.observe(R,A)}function v(){f.disconnect(),p.disconnect()}document.querySelector("#auto-load").addEventListener("change",t=>{t.target.checked?(document.querySelector("table"),b(),document.querySelector("tbody").children.length!==i.payload.length&&(document.querySelector("#btn-load-more").style.display="none")):(v(),document.querySelector("tbody").children.length!==i.payload.length&&(document.getElementById("btn-load-more").style.display=""))});document.querySelector("#search-bar input").addEventListener("input",t=>{t.target.value!==""?v():b(),S(t.target.value)});document.querySelectorAll("th:not(:last-child) span").forEach(t=>{t.addEventListener("click",o=>{if(o.currentTarget.classList.contains("sort-indicator"))return;l.sortCol.name==t.innerText?l.sortCol.ascOrder=!l.sortCol.ascOrder:(l.sortCol.name=t.innerText,l.sortCol.ascOrder=!0),document.querySelectorAll(".sort-indicator").forEach(n=>{n.setAttribute("data-after","")});let e="";e=l.sortCol.ascOrder?"▲":"▼",t.children[0].setAttribute("data-after",e),h(t.innerText)})});function S(t){Array.from(document.querySelector("tbody").children).map(o=>{o.children[2].textContent.toLowerCase().includes(t.toLowerCase())?o.classList.remove("display-none"):o.classList.add("display-none")})}function h(t){var o=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});const e=document.querySelector("tbody");let a=Array.from(e.children).sort((r,d)=>{const s=r.children[l.idStore[t]].innerText,c=d.children[l.idStore[t]].innerText;return o.compare(s,c)});l.sortCol.ascOrder||a.reverse(),a.forEach(r=>e.appendChild(r))}document.querySelector("#auto-sort").addEventListener("change",t=>{l.options.autosort=!l.options.autosort,h(l.sortCol.name)});function J(t){const o=parseInt(t.target.dataset.id),e=document.createElement("view-modal"),n=i.payload.filter(a=>a.id==o)[0];e.dataset.id=n.id,e.dataset.userId=n.userId,e.dataset.title=n.title,document.querySelector("body").appendChild(e),document.querySelector("view-modal").shadowRoot.children[0].children[1].showModal()}document.querySelector("#create-item").addEventListener("click",t=>{const o=document.createElement("create-modal");document.querySelector("body").appendChild(o),document.querySelector("create-modal").shadowRoot.children[0].children[1].showModal()});function H(t){const o=parseInt(t.target.dataset.id),e=i.payload.filter(a=>a.id==o)[0],n=document.createElement("edit-modal");n.dataset.id=t.target.dataset.id,n.dataset.userid=e.userId,n.dataset.title=e.title,document.querySelector("body").appendChild(n),document.querySelector("edit-modal").shadowRoot.children[0].children[1].showModal()}function P(t){const o=parseInt(t.target.dataset.id),e=i.payload.filter(a=>a.id==o)[0],n=document.createElement("toast-modal");n.dataset.id=t.target.dataset.id,n.dataset.title=e.title,document.querySelector("body").appendChild(n),document.querySelector("toast-modal").shadowRoot.children[0].children[1].showModal()}
