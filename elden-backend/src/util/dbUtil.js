const Album = require("../db/models/albumModel");
const Song = require("../db/models/songModel");
const { getConnection } = require("../db/dbSequelizeconn");
const UserSong = require("../db/models/userSongModel");
const File = require("../db/models/fileModel");

async function doesAlbumAcceptsMoreSongs(idAlbum) {
  const album = await Album.findOne({ where: { id_album: idAlbum } });
  const isSingle = album.is_single;

  const cantSongs = await Song.count({ where: { id_album: idAlbum } });
  if (isSingle && cantSongs >= 1) {
    return false;
  } else return true;
}

async function doesUserOwnsSong(idUser, idSong) {
  const conn = getConnection();
  const userSong = await conn.query(
    `SELECT * FROM tbl_user_song where id_user = ${idUser} and id_song = ${idSong} `
  );
  return userSong !== null;
}

async function getCorrspondingSongVersion(token, idSong) {
  const song = await Song.findOne({ where: { id_song: idSong } });
  if (!song) return null;

  const previewSong = await File.findOne({
    where: { id_file: song.id_preview_song_file },
  });

  if (!token) {
    return previewSong;
  }

  const userSong = await UserSong.findOne({
    where: {
      id_user: token.id_user,
      id_song: idSong,
    },
  });

  if (!userSong) {
    return previewSong;
  } else {
    return await File.findOne({
      where: { id_file: song.id_song_file },
    });
  }
}

async function buyAlbum(idAlbum, idUser) {
  try {
    const album = await Album.findOne({
      where: { id_album: idAlbum },
      include: {
        model: Song,
      },
    });
    const songs = album.Songs;
    for (let index = 0; index < songs.length; index++) {
      const song = songs[index];
      await UserSong.create({ id_user: idUser, id_song: song.id_song });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  doesAlbumAcceptsMoreSongs,
  doesUserOwnsSong,
  getCorrspondingSongVersion,
  buyAlbum,
};
