const { getErrorAnswer, getSuccessAnswer } = require("../util/util");
const File = require("../db/models/fileModel");
const {
  buyAlbum,
  searchSongByName,
  searchAlbumByName,
  searchSongBySinger,
  searchAlbumBySinger,
} = require("../util/dbUtil");
const UserSong = require("../db/models/userSongModel");
const Song = require("../db/models/songModel");
const Album = require("../db/models/albumModel");
const Singer = require("../db/models/singerModel");
const { getConnection } = require("../db/dbSequelizeconn");
const getDataBaseConnection = require("../db/dbConnect");
const { Op, where } = require("sequelize");

async function getUserSongs(req, res, next) {
  try {
    const { decode } = req.body;
    const songs = await UserSong.findAll({
      where: { id_user: decode.id_user },
      include: {
        model: Song,
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
      },
    });

    res.json(songs);
  } catch (error) {
    next(error);
  }
}

async function buyItems(req, res, next) {
  try {
    const { items } = req.body;
    const { decode } = req.body;

    try {
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        if (item.isSong) {
          await UserSong.create({
            id_user: decode.id_user,
            id_song: item.idItem,
          });
        } else {
          buyAlbum(item.idItem, decode.id_user);
        }
      }
    } catch (error) {}

    res.json(getSuccessAnswer(200, "The song is now yours !"));
  } catch (error) {
    next(error);
  }
}

async function isSongBought(req, res, next) {
  try {
    const { idSong } = req.params;
    const { decode } = req.body;

    const song = await UserSong.findOne({
      where: {
        id_song: idSong,
        id_user: decode.id_user,
      },
    });

    res.json({ response: song !== null });
  } catch (error) {
    next(error);
  }
}

async function isAlbumBougth(req, res, next) {
  try {
    const { decode } = req.body;
    const { idAlbum } = req.params;

    const totalAlbumSongs = await Song.count({
      where: {
        id_album: idAlbum,
      },
    });

    const conn = await getDataBaseConnection();
    const [songsFromAlbumPossessed, keys] = await conn.execute(
      "select count(*) as 'count' from tbl_song as s inner join tbl_user_song as us on s.id_song = us.id_song where us.id_user = ? and id_album = ?",
      [decode.id_user, idAlbum]
    );

    if (songsFromAlbumPossessed[0].count === totalAlbumSongs) {
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  } catch (error) {
    next(error);
  }
}

/*SEARCH*/
async function searchByName(req, res, next) {
  try {
    let { order, name } = req.query;
    order = order === null ? true : false;
    const response = { songs: [], albums: [] };

    const songs = await searchSongByName(name);
    const albums = await searchAlbumByName(name);

    response.songs = songs;
    response.albums = albums;

    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function searchBySinger(req, res, next) {
  try {
    let { order, name } = req.query;
    order = order === null ? true : false;
    const response = { songs: [], albums: [] };

    const songs = await searchSongBySinger(name, order);
    const albums = await searchAlbumBySinger(name, order);

    response.songs = songs;
    response.albums = albums;

    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function searchBySinger(req, res, next) {
  try {
    let { order, name } = req.query;
    order = order === null ? true : false;
    const response = { songs: [], albums: [] };

    const songs = await searchSongBySinger(name, order);
    const albums = await searchAlbumBySinger(name, order);

    response.songs = songs;
    response.albums = albums;

    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function searchByAlbum(req, res, next) {
  try {
    let { order, name } = req.query;
    order = order === null ? true : false;
    const response = { songs: [], albums: [] };
    const whereOpt = name
      ? {
          album_name: { [Op.like]: `%${name}%` },
        }
      : null;

    const albums = await Album.findAll({
      include: [
        {
          model: Singer,
        },
        { model: Song },
      ],
      where: whereOpt,
      order: [["release_date", order ? "ASC" : "DESC"]],
    });

    response.albums = albums;

    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserSongs,
  buyItems,
  isSongBought,
  isAlbumBougth,
  searchByName,
  searchBySinger,
  searchByAlbum,
};
