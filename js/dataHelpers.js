

export async function getData (id = "") {
    const BASE_URL = JSON.parse(localStorage.getItem('config')).baseURL + 'albums/';
    const data = await fetch(BASE_URL + id);
    if (data.status === 200 ){
        return {status: "ok", payload: await data.json()};
    }
    return {status: "err"}
}

export function patchData(id,userId,title){
    if (id === null || title == null || userId == null){
        return {status:"err"}
    }
    let data = JSON.parse(localStorage.getItem('data'));
    for (let i = 0; i < data.payload.length; i++){
        if (data.payload[i].id == id){
            data.payload[i] = {
                id,
                title,
                userId
            }
            localStorage.setItem('data',JSON.stringify(data));
        break;
        }
    }
}

export function deleteData(id){
    if (id === null){
        return {status:"err"}
    }
    let data = JSON.parse(localStorage.getItem('data'));
    for (let i = 0; i < data.payload.length; i++){
        if (data.payload[i].id == id){
            data.payload.splice(i,1);
            localStorage.setItem('data',JSON.stringify(data));
        break;
        }
    }
}

export async function getPhotoURL(id){
    // console.log('url',JSON.parse(localStorage.getItem('config')).baseURL + `albums/${id}/photos`)
    const PHOTO_URL = await fetch(JSON.parse(localStorage.getItem('config')).baseURL + `albums/${id}/photos`)
    .then(r => r.json())
    .then(r => r[0].url);
    return PHOTO_URL;
}

export function createAlbum(userId,title) {
    if (title == null || userId == null){
        return {status:"err"}
    }
    let data = JSON.parse(localStorage.getItem('data'));
    const lastId = Math.max(...data.payload.map(d => d.id));
    // console.log(lastId);
    let newData = {
        id: lastId + 1,
        userId,
        title
    }
    data.payload.push(newData);
    localStorage.setItem('data',JSON.stringify(data));
}