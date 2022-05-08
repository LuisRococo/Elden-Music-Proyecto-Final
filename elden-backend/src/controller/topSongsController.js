const Album = require("../db/models/albumModel");
const File = require("../db/models/fileModel");
const Singer = require("../db/models/singerModel");
const Song = require("../db/models/songModel");

async function getTopSongs(req, res, next) {
  try {
    const limit = req.query.limit;
    const query = {
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
    };

    if (limit) query["limit"] = Number.parseInt(limit);

    const albums = await Song.findAll(query);
    res.json(albums);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTopSongs,
};
