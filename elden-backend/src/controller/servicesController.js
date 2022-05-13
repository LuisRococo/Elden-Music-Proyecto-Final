const { getErrorAnswer, getSuccessAnswer } = require("../util/util");
const File = require("../db/models/fileModel");
const { buyAlbum } = require("../util/dbUtil");
const UserSong = require("../db/models/userSongModel");
const Song = require("../db/models/songModel");
const Album = require("../db/models/albumModel");
const Singer = require("../db/models/singerModel");
const { getConnection } = require("../db/dbSequelizeconn");
const getDataBaseConnection = require("../db/dbConnect");

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

module.exports = {
  getUserSongs,
  buyItems,
  isSongBought,
  isAlbumBougth,
};
