const Album = require("../db/models/albumModel");
const Song = require("../db/models/songModel");

async function doesAlbumAcceptsMoreSongs(idAlbum) {
  const album = await Album.findOne({ where: { id_album: idAlbum } });
  const isSingle = album.is_single;

  const cantSongs = await Song.count({ where: { id_album: idAlbum } });
  if (isSingle && cantSongs >= 1) {
    return false;
  } else return true;
}

module.exports = { doesAlbumAcceptsMoreSongs };
