const { getErrorAnswer, getSuccessAnswer } = require("../util/util");
const File = require("../db/models/fileModel");
const {
  doesUserOwnsSong,
  getCorrspondingSongVersion,
} = require("../util/dbUtil");
const UserSong = require("../db/models/userSongModel");
const Song = require("../db/models/songModel");
const Album = require("../db/models/albumModel");

async function getUserSongs(req, res, next) {
  try {
    const songs = await UserSong.findAll({
      where: { id_user: decode.id_user },
      include: [
        {
          model: Song,
          include: {
            model: Album,
          },
        },
      ],
    });

    res.json(songs);
  } catch (error) {
    next(error);
  }
}

async function buySongs(req, res, next) {
  try {
    const { songs } = req.body;
    const { decode } = req.body;

    try {
      for (let index = 0; index < idSongs.length; index++) {
        const idSong = songs[index];
        await UserSong.create({ id_user: decode.id_user, id_song: idSong });
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

    const song = await UserSong({
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

module.exports = {
  getUserSongs,
  buySongs,
  isSongBought,
};
