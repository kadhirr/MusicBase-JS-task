

export async function getData (id = "") {
    const BASE_URL = JSON.parse(localStorage.getItem('config')).baseURL + 'albums/';
    const data = await fetch(BASE_URL + id);
    if (data.status === 200 ){
        return {status: "ok", payload: await data.json()};
    }
    return {status: "err"}
}