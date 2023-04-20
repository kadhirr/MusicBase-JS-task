const BASE_URL = "https://jsonplaceholder.typicode.com/albums/";

export async function getData (id = "") {
    const data = await fetch(BASE_URL + id);
    if (data.status === 200 ){
        return {status: "ok", payload: await data.json()};
    }
    return {status: "err"}
}