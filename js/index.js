import {getData} from './dataHelpers.js'
import { defineCustomModal } from './modal.js';



let respData = null;



function checkIfMoreDataExists(){
    const tBody = document.querySelector('tbody');
    const lengthOfPrefilledData = tBody.children.length;
    if (lengthOfPrefilledData == respData.payload.length){
        document.querySelector('#btn-load-more').remove();
    }
}

async function fetchData(){
    respData = await getData();
}

function hideLoader(){
    const loading = document.querySelector('#loading');
    loading.classList.remove('display');
    loading.style.display = 'none';
    document.getElementById('myContainer').style.display = 'block';

}

async function fillTable(){
    if (respData === null){
        await fetchData();
    }
    if (document.querySelector('tbody').childElementCount == 0){
        hideLoader();
    }
    const data = respData;
    console.log(data,data.payload);
    if (data.status == 'ok' && data !== undefined){
        const table = document.querySelector('table');
        const tBody = document.querySelector('tbody');
        const lengthOfPrefilledData = tBody.children.length;
        for (let i = lengthOfPrefilledData; i < lengthOfPrefilledData + 20; i++) {
            const row = document.createElement('tr');
            const dataToInsert = [data.payload[i].id,data.payload[i].userId,data.payload[i].title]
            for (const value of dataToInsert){
                console.log(value)
                const cell = document.createElement('td');
                cell.dataset.id = data.payload[i].id;
                cell.appendChild(document.createTextNode(value));
                row.appendChild(cell);
            };
            const actionsData = document.createElement('td');
            actionsData.classList.add("actions");
            const viewAction = document.createElement('span');
            const editAction = document.createElement('span');
            const deleteAction = document.createElement('span');
            viewAction.appendChild(document.createTextNode('visibility'));
            editAction.appendChild(document.createTextNode('edit'));
            deleteAction.appendChild(document.createTextNode('delete'));
            viewAction.dataset.id = data.payload[i].id;
            editAction.dataset.id = data.payload[i].id;
            deleteAction.dataset.id = data.payload[i].id;
            viewAction.classList.add("material-symbols-outlined");
            editAction.classList.add("material-symbols-outlined");
            deleteAction.classList.add("material-symbols-outlined");
            actionsData.append(viewAction,editAction,deleteAction);
            row.appendChild(actionsData);
            tBody.appendChild(row);
        }
    }
    
    checkIfMoreDataExists();

}


function pageInitialSetup() {
    defineCustomModal();
    document.getElementById('myContainer').style.display = 'none';
    const loader = document.getElementById('loading');
    loader.classList.add('display');
    fillTable();
};
pageInitialSetup();


document.querySelector("#btn-load-more").addEventListener('click', (event)=> {
    fillTable();
})

/** INTERSECTION OBSERVER */
const intersectionObserver = new IntersectionObserver((entries) => {
    console.log("INTERSECTION");
    if (entries[0].intersectionRatio <= 0.75) return;
    if (document.querySelector("tbody").childElementCount == respData.payload.length){
        return;
    }
    fillTable();
}, 
{
    root: null,
    rootMargin: "0px",
    threshold: [1],
})

/** MUTATION OBSERVER */

var options = {
    root: null,
    rootMargin: "0px",
    threshold: [1],
};

// Select the node that will be observed for mutations
const targetNode = document.querySelector("table");

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
//   console.log("MUTATELIST",mutationList);
  const prevObservedElement = document.querySelector("tr:nth-last-child(22)");
  console.log("prev",prevObservedElement);
  if (prevObservedElement !== null){
    intersectionObserver.unobserve(prevObservedElement);
  }
  const sel = document.querySelector("tr:nth-last-child(2)");
  intersectionObserver.observe(sel);
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
// observer.observe(targetNode, config);



/* AUTOLOAD LOGIC */

function autoLoadSetupUtil() {
    intersectionObserver.disconnect();
    const sel = document.querySelector("tr:nth-last-child(2)");
    intersectionObserver.observe(sel);
    observer.observe(targetNode, config);
}

function autoLoadDestructUtil () {
    observer.disconnect()
    intersectionObserver.disconnect();
}

document.querySelector("#auto-load").addEventListener("change",
(event) => {
    if (event.target.checked){
        // Start Mutation Observer
    const targetNode = document.querySelector("table");
        // observer.observe(targetNode, config);
        autoLoadSetupUtil();
        console.log("checked", observer,targetNode)
        document.querySelector("#btn-load-more").style.display = 'none';
    } else {
        // observer.disconnect();
        autoLoadDestructUtil();
        document.getElementById("btn-load-more").style.display = '';

    }
})


// MODAL EVENT LISTENER - DIALOG

const dialog = document.querySelector("dialog")

document.querySelector("#openDialog").addEventListener("click", (e) => {
    dialog.showModal();
    document.querySelector("body").classList.add("overflow-hidden");
})

// document.querySelector("#closeDialog").addEventListener("click",(e) => {
//     dialog.close();
//     document.querySelector("body").classList.remove("overflow-hidden");
// })


document.querySelector("#modal-cmp").addEventListener('click', (e) => {
    const modalEle = document.createElement('x-modal');
    document.querySelector('body').appendChild(modalEle);
    document.querySelector("x-modal").shadowRoot.children[0].children[1].showModal();
})