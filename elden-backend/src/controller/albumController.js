const { Album } = require("../db/models/albumModel");
const { getErrorAnswer } = require("../util/util");

async function getAlbums(req, res, next) {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    next(error);
  }
}

async function createAlbum(req, res, next) {
  try {
    const { name, image, singer, releaseDate, price, genre, isSingle, stock } =
      req.body;
    let newAlbum = new Album({
      name,
      image,
      singer,
      releaseDate,
      price,
      genre,
      isSingle,
      stock
    });
    newAlbum = await newAlbum.save();
    res.json(newAlbum);
  } catch (error) {
    next(error);
  }
}

async function getAlbum(req, res, next) {
  try {
    const { _id } = req.params;

    if (!_id) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const album = await Album.findById(_id);
    res.json(album);
  } catch (error) {
    next(error);
  }
}

async function deleteAlbum(req, res, next) {
  try {
    const { _id } = req.body;

    if (!_id) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const album = await Album.findByIdAndDelete(_id, { new: true });
    res.json(album);
  } catch (error) {
    next(error);
  }
}

//aqui falta lo de checar la cant de canciones para cambiar el isSingle
async function updateAlbum(req, res, next) {
  try {
    const {
      _id,
      name,
      image,
      singer,
      releaseDate,
      price,
      genre,
      isSingle,
      stock
    } = req.body;

    if (!_id) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const album = await Album.findByIdAndUpdate(
      _id,
      { name, image, singer, releaseDate, price, genre, isSingle, stock },
      { new: true }
    );
    res.json(album);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAlbums,
  createAlbum,
  getAlbum,
  deleteAlbum,
  updateAlbum
};
