import { URL_DIR } from "./other";

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
export async function requestCreateSinger (singerName, stageName, nationality, image, token) {
    const body = {
        singerName, stageName, nationality, image
    }
    const response = await fetch(URL_DIR + "/api/singers", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {     "Content-Type": "application/json", "authorization": "Bearer "+token   }
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

export async function requestDeleteSinger (idSinger, token) {
    const body = {
        idSinger
    }
    const response = await fetch(URL_DIR + "/api/singers", {
        body: JSON.stringify(body),
        method: "DELETE",
        headers: {     "Content-Type": "application/json", "authorization": "Bearer "+token   }
    });

    return response;
}