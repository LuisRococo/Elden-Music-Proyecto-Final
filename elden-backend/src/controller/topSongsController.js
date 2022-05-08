const Album = require("../db/models/albumModel");
const File = require("../db/models/fileModel");
const Singer = require("../db/models/singerModel");
const Song = require("../db/models/songModel");
const TopSingerSongs = require("../db/models/topSingerSongs");

async function getTopSongsSinger(req, res, next) {
  try {
    const { idSinger } = req.params;
    const query = {
      where: {
        id_singer: idSinger,
      },
      include: [
        {
          model: Singer,
        },
        {
          model: Song,
          include: [
            {
              model: Album,
            },
          ],
        },
      ],
    };

    const songs = await TopSingerSongs.findAll(query);
    res.json(songs);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTopSongsSinger,
};
