import { getTokenPrepared, URL_DIR } from "./other";

//AUTH

export async function fetchLogin(userName, password) {
    const body = {
        userName, password
    }
    const response = await fetch(URL_DIR + "/api/users/login", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {     "Content-Type": "application/json"   }
    });

    return response;
}

export async function fetchSignin(userName, password, email) {
    const body = {
        userName, password, email
    }
    const response = await fetch(URL_DIR + "/api/users", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {     "Content-Type": "application/json"   }
    });

    return response;
}

//SINGERS
export async function requestCreateSinger (singerName, stageName, nationality, image) {
    const body = {
        singerName, stageName, nationality, image
    }

    const token = getTokenPrepared();
    
    const response = await fetch(URL_DIR + "/api/singers", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {     "Content-Type": "application/json", "authorization": token   }
    });

    return response;
}

export async function fetchSingers () {
    const response = await fetch(URL_DIR + "/api/singers", {
        method: "GET",
    });

    return response;
}

export async function fetchFileBase64 (idFile) {
    const response = await fetch(URL_DIR + `/api/files/${idFile}`, {
        method: "GET",
    });

    return response;
}

export async function requestDeleteSinger (idSinger) {
    const body = {
        idSinger
    }
    const token = getTokenPrepared();
    const response = await fetch(URL_DIR + "/api/singers", {
        body: JSON.stringify(body),
        method: "DELETE",
        headers: {     "Content-Type": "application/json", "authorization": token   }
    });

    return response;
}


export async function requestUpdateArtist (idSinger, singerName, stageName, nationality, image) {
    const body = {
        idSinger, singerName, stageName, nationality, image
    }
    const token = getTokenPrepared();
    const response = await fetch(URL_DIR + "/api/singers", {
        body: JSON.stringify(body),
        method: "PUT",
        headers: {     "Content-Type": "application/json", "authorization": token   }
    });

    return response;
}

//ALBUMS
export async function fetchAlbums () {
    const response = await fetch(URL_DIR + "/api/albums", {
        method: "GET",
    });

    return response;
}

export async function requestCreateAlbums (albumName, releaseDate, isSingle, idSinger, image, priceAlbum, priceSong) {
    const body = {
        albumName, releaseDate, isSingle, idSinger, image, priceAlbum, priceSong
    }

    const token = getTokenPrepared();

    const response = await fetch(URL_DIR + "/api/albums", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {     "Content-Type": "application/json", "authorization": token   }
    });

    return response;
}