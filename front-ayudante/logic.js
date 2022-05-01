const imagenInput = document.getElementById("imagen-input");
const imageForm = document.getElementById("image-form");
const imageReturnedComp = document.getElementById("imagen-regresada");

const cancionInput = document.getElementById("cancion-input");
const cancionForm = document.getElementById("cancion-form");
const cancionReturnedComp = document.getElementById("cancion-regresada");
const audioComp = document.getElementById("audio-comp");

imageForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    imagen: await toBase64(imagenInput.files[0])
  };

  const res = await fetch("http://192.168.1.65:8000/api/test/imagen", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const imagenId = parseInt(await res.text());
  loadImage(imagenId);
});

async function loadImage(idImagen) {
  const res = await fetch(
    `http://192.168.1.65:8000/api/test/imagen/${idImagen}`,
    {
      method: "GET"
    }
  );

  const imagen64 = await res.text();
  imageReturnedComp.src = imagen64;
}

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

//UPLOAD IMAGE
cancionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    song: await toBase64(cancionInput.files[0])
  };

  const res = await fetch("http://192.168.1.65:8000/api/test/song", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const songId = parseInt(await res.text());
  loadSong(songId);
});

async function loadSong(songId) {
  const res = await fetch(`http://192.168.1.65:8000/api/test/song/${songId}`, {
    method: "GET"
  });

  const song64 = await res.text();
  audioComp.src = song64;
}
