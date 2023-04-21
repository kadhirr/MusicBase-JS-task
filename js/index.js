import {getData} from './dataHelpers.js'
import { defineCustomModal } from './modal.js';



let respData = null;

let globalConfig = {
    // regular defaults, edge cases are handled
    // sortCol: {
    //     name: null,
    //     ascOrder: true
    // },
    // below is a sensible default based on the assumption that backend sends data 
    // sorted based on ID
    sortCol: {
        name: 'ID',
        ascOrder: true
    },
    options: {
        autoload: false,
        autosort: false
    },
    idStore: {
        'ID': 0,
        'User ID': 1,
        'Title': 2
    }
};



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
            viewAction.addEventListener('click',viewActionModal);
            actionsData.append(viewAction,editAction,deleteAction);
            row.appendChild(actionsData);
            tBody.appendChild(row);
        }
    }
    if (globalConfig.options.autosort && globalConfig.sortCol.name !== null){
        showSortedItems(globalConfig.sortCol.name); 
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
const mutationObserverConfig = { attributes: true, childList: true, subtree: true };

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
    observer.observe(targetNode, mutationObserverConfig);
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
        if (document.querySelector('tbody').children.length !== respData.payload.length){
            document.querySelector("#btn-load-more").style.display = 'none';
        }
    } else {
        // observer.disconnect();
        autoLoadDestructUtil();
        if (document.querySelector('tbody').children.length !== respData.payload.length){
            document.getElementById("btn-load-more").style.display = '';
        }

    }
})


// MODAL EVENT LISTENER - DIALOG


document.querySelector("#modal-cmp").addEventListener('click', (e) => {
    const modalEle = document.createElement('x-modal');

    document.querySelector('body').appendChild(modalEle);
    document.querySelector("x-modal").shadowRoot.children[0].children[1].showModal();
})


// SEARCH AND FILTER EVENT LISTENERS

document.querySelector("#search-bar input").addEventListener('input',(event) => {
    console.log(event.target.value);
    showFilteredItems(event.target.value);
})

document.querySelectorAll('th:not(:last-child) span').forEach((item) => {
    item.addEventListener('click', (e) => {
        if (globalConfig.sortCol.name == item.innerText){
            globalConfig.sortCol.ascOrder = !globalConfig.sortCol.ascOrder;
        }
        else{
            globalConfig.sortCol.name = item.innerText;
            globalConfig.sortCol.ascOrder = true;
        }
        console.log(item);

        // CLEAR PREVIOUS SORT INDICATORS
        document.querySelectorAll('.sort-indicator').forEach( (item) => {
            item.setAttribute('data-after','');
        })

        // SET THE SORT INDICATOR
        let sortIndicatorValue = '';
        sortIndicatorValue = globalConfig.sortCol.ascOrder ? '▲' : '▼';
        // console.log(item.children[0]);
        item.children[0].setAttribute('data-after',sortIndicatorValue)
        console.log("sortconfig",globalConfig.sortCol);
        showSortedItems(item.innerText);
    })
})



function showFilteredItems(searchTerm){
    Array.from(document.querySelector('tbody').children).map((entry) => {
        // Get the textcontent of title, convert it to lowercase and compare if it contains a substring of the searchterm, 
        // which is also converted to lowecase. The whole comparsion is negated, so if it the row doesnt contain the query,
        // it is removed from the table, else it is added back. 
        if (!entry.children[2].textContent.toLowerCase().includes(searchTerm.toLowerCase())){
            entry.classList.add('display-none');
        }
        else{
            entry.classList.remove('display-none');
        }
    })

}

function showSortedItems(key){
    console.log("key",key);
    var collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    const parent = document.querySelector('tbody');
    const items = Array.from(parent.children);
    let sortedItems = items.sort((a,b) => {
        const x =  a.children[globalConfig.idStore[key]].innerText;
        const y = b.children[globalConfig.idStore[key]].innerText;
        return collator.compare(x, y);
    })
    if (!globalConfig.sortCol.ascOrder){
        sortedItems.reverse();
    }
    sortedItems.forEach(element => parent.appendChild(element));
}  

// Query Selector for Auto Sort
document.querySelector('#auto-sort').addEventListener('change',(e) => {
    globalConfig.options.autosort = !globalConfig.options.autosort;
})

// MODAL EVENT LISTENER FOR VIEW ACTION
function viewActionModal(e){
    const id = parseInt(e.target.dataset.id) - 1;
    const modalEle = document.createElement('x-modal');

    // Add userId h1 element with slot
    const IdEle = document.createElement('h1');
    IdEle.innerText = 'ID: ' + respData.payload[id].id;
    IdEle.setAttribute('slot','id');
    modalEle.appendChild(IdEle);

    // Add title h1 element with slot
    const userIdEle = document.createElement('h1');
    userIdEle.innerText = ' User ID: ' + respData.payload[id].userId;
    userIdEle.setAttribute('slot','userid');
    modalEle.appendChild(userIdEle);

    // Add Title h1 element with slot
    const titleEle = document.createElement('h1');
    titleEle.innerText = 'Title: ' + respData.payload[id].title;
    titleEle.setAttribute('slot','title');
    modalEle.appendChild(titleEle);

    document.querySelector('body').appendChild(modalEle);
    console.log(modalEle);  
    document.querySelector("x-modal").shadowRoot.children[0].children[1].showModal();
}