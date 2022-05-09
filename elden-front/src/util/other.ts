import store from "../redux/store";

const URL_DIR = "http://localhost:8000";

async function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

function getTokenPrepared () {
  return "Bearer " + store.getState().token?.token?.token;
}

function doesItemAlreadyExists(items, idItem, isSong) {
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.isSong === isSong && item.idItem === idItem) return true;
  }
  return false;
}

export {
    URL_DIR,
    toBase64,
    getTokenPrepared,
    doesItemAlreadyExists
}

