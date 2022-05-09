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

export async function fetchSingers (limit = null) {
    const response = await fetch(URL_DIR + `/api/singers${limit ? ("?limit="+limit): ""}`, {
        method: "GET",
    });

    return response;
}

export async function fetchSinger (idSinger) {
    const response = await fetch(URL_DIR + `/api/singers/${idSinger}}`, {
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
export async function fetchAlbum (idAlbum) {
    const response = await fetch(URL_DIR + `/api/albums/${idAlbum}`, {
        method: "GET",
    });

    return response;
}

export async function fetchAlbums () {
    const response = await fetch(URL_DIR + "/api/albums", {
        method: "GET",
    });

    return response;
}

export async function requestCreateAlbums (albumName, releaseDate, isSingle, idSinger, image, priceAlbum, priceSong, priceAlbumDigital) {
    const body = {
        albumName, releaseDate, isSingle, idSinger, image, priceAlbum, priceSong, priceAlbumDigital
    }

    const token = getTokenPrepared();

    const response = await fetch(URL_DIR + "/api/albums", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {     "Content-Type": "application/json", "authorization": token   }
    });

    return response;
}

//SONG

export async function requestCreateSong (songName, duration, previewSongFile, songFile, idAlbum) {
    const body = {
        songName, duration, previewSongFile, songFile, idAlbum
    }

    const token = getTokenPrepared();

    const response = await fetch(URL_DIR + "/api/songs", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {     "Content-Type": "application/json", "authorization": token   }
    });

    return response;
}

export async function fetchSongs (limit = null) {
    
    const response = await fetch(URL_DIR + `/api/songs${limit ? ("?limit="+limit) : ""}`, {
        method: "GET",
    });

    return response;
}

/*TOP 5 SONGS*/
export async function fetchTopSongs (idArtist) {
    const response = await fetch(URL_DIR + `/api/singer-tops/${idArtist}`, {
        method: "GET",
    });

    return response;
}