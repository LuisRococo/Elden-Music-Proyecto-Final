const Album = require("../db/models/albumModel");
const Song = require("../db/models/songModel");
const { getConnection } = require("../db/dbSequelizeconn");
const UserSong = require("../db/models/userSongModel");
const File = require("../db/models/fileModel");
const { Op, where } = require("sequelize");
const Singer = require("../db/models/singerModel");

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

//SEARCH
async function searchSongByName(name, order) {
  const whereOpt = name
    ? {
        song_name: { [Op.like]: `%${name}%` },
      }
    : null;
  const songs = await Song.findAll({
    include: [
      {
        model: Album,
        include: [
          {
            model: Singer,
          },
        ],
      },
    ],
    where: whereOpt,
    order: [[Album, "release_date", order ? "ASC" : "DESC"]],
  });
  return songs;
}

async function searchAlbumByName(name, order) {
  const whereOpt = name
    ? {
        album_name: { [Op.like]: `%${name}%` },
      }
    : null;
  const opt = {
    include: [
      {
        model: Singer,
      },
      { model: Song },
    ],
    where: whereOpt,
    order: [["release_date", order ? "ASC" : "DESC"]],
  };

  const albums = await Album.findAll(opt);
  return albums;
}

async function searchSongBySinger(name, order) {
  const whereOpt = name
    ? { "$Album.Singer.singer_name$": { [Op.like]: `%${name}%` } }
    : null;
  const opt = {
    include: [
      {
        model: Album,
        include: [
          {
            model: Singer,
          },
        ],
      },
    ],

    where: whereOpt,
    order: [[Album, "release_date", order ? "ASC" : "DESC"]],
  };

  return await Song.findAll(opt);
}

async function searchAlbumBySinger(name, order) {
  const whereOpt = name
    ? {
        "$Singer.singer_name$": { [Op.like]: `%${name}%` },
      }
    : null;
  const opt = {
    include: [
      {
        model: Singer,
      },
      { model: Song },
    ],
    order: [["release_date", order ? "ASC" : "DESC"]],
    where: whereOpt,
  };

  const albums = await Album.findAll(opt);
  return albums;
}

module.exports = {
  doesAlbumAcceptsMoreSongs,
  doesUserOwnsSong,
  getCorrspondingSongVersion,
  buyAlbum,
  searchSongByName,
  searchAlbumByName,
  searchAlbumBySinger,
  searchSongBySinger,
};
