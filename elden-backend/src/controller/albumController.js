const Album = require("../db/models/albumModel");
const File = require("../db/models/fileModel");
const Singer = require("../db/models/singerModel");
const Song = require("../db/models/songModel");
const { getErrorAnswer, getSuccessAnswer } = require("../util/util");

async function getAlbums(req, res, next) {
  try {
    const albums = await Album.findAll({
      include: [
        {
          model: Singer,
        },
        {
          model: Song,
        },
      ],
    });
    res.json(albums);
  } catch (error) {
    next(error);
  }
}

async function createAlbum(req, res, next) {
  try {
    const {
      albumName,
      releaseDate,
      isSingle,
      idSinger,
      priceAlbum,
      priceSong,
      image,
      priceAlbumDigital,
    } = req.body;
    //CREATE IMAGE
    const albumImageDb = await File.create({
      file_content: image,
      is_song: false,
    });

    await Album.create({
      album_name: albumName,
      release_date: releaseDate,
      is_single: isSingle,
      id_singer: idSinger,
      id_image: albumImageDb.id_file,
      price_album: priceAlbum,
      price_song: priceSong,
      price_album_digital: priceAlbumDigital,
    });
    res.json(getSuccessAnswer(200, "Album created"));
  } catch (error) {
    next(error);
  }
}

async function getAlbum(req, res, next) {
  try {
    const { idAlbum } = req.params;

    if (!idAlbum) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const album = await Album.findOne({
      id_album: idAlbum,
      include: [
        {
          model: Singer,
        },
        {
          model: Song,
        },
      ],
      where: {
        id_album: idAlbum,
      },
    });
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

module.exports = {
  getAlbums,
  createAlbum,
  getAlbum,
  deleteAlbum,
};
