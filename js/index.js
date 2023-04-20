import {getData} from './dataHelpers.js'

let respData = null;


const event = new Event("build");


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

async function fillTable(){
    if (respData === null){
        await fetchData();
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
            viewAction.appendChild(document.createTextNode('visibility'));
            editAction.appendChild(document.createTextNode('edit'));
            viewAction.dataset.id = data.payload[i].id;
            editAction.dataset.id = data.payload[i].id;
            viewAction.classList.add("material-symbols-outlined");
            editAction.classList.add("material-symbols-outlined");
            actionsData.append(viewAction,editAction);
            row.appendChild(actionsData);
            tBody.appendChild(row);
        }
    }
    checkIfMoreDataExists();

}

fillTable();


document.querySelector("#btn-load-more").addEventListener('click', (event)=> {
    fillTable();
})

/** INTERSECTION OBSERVER */
const intersectionObserver = new IntersectionObserver((entries) => {
    console.log("INTERSECTION");
    if (entries[0].intersectionRatio <= 0.75) return;
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
  console.log(mutationList);
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
observer.observe(targetNode, config);


/* MODAL LOGIC */
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


