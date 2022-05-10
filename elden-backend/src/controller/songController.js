const Album = require("../db/models/albumModel");
const File = require("../db/models/fileModel");
const Singer = require("../db/models/singerModel");
const Song = require("../db/models/songModel");
const TopSingerSongs = require("../db/models/topSingerSongs");
const { getErrorAnswer, getSuccessAnswer } = require("../util/util");
const { doesAlbumAcceptsMoreSongs } = require("../util/dbUtil");

async function getSongs(req, res, next) {
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

async function createSong(req, res, next) {
  try {
    const { songName, duration, previewSongFile, songFile, idAlbum } = req.body;

    if (!(await doesAlbumAcceptsMoreSongs(idAlbum))) {
      res
        .status(400)
        .json(
          getErrorAnswer(
            400,
            "This album is single and does not accepts more songs"
          )
        );
      return;
    }

    const previewSongDb = await File.create({
      file_content: previewSongFile,
      is_song: true,
      is_song_complete: false,
    });
    const SongDb = await File.create({
      file_content: songFile,
      is_song: true,
      is_song_complete: true,
    });

    const song = await Song.create({
      song_name: songName,
      duration: duration,
      id_preview_song_file: previewSongDb.id_file,
      id_song_file: SongDb.id_file,
      id_album: idAlbum,
    });

    //ADD SONG TO TOP
    const album = await Album.findOne({ where: { id_album: idAlbum } });
    const idSinger = album.id_singer;
    const cantTopSongs = await TopSingerSongs.count({
      where: { id_singer: idSinger },
    });
    if (cantTopSongs < 5) {
      await TopSingerSongs.create({
        id_singer: idSinger,
        id_song: song.id_song,
      });
    }
    res.json(getSuccessAnswer(200, "Song created"));
  } catch (error) {
    next(error);
  }
}

async function getSong(req, res, next) {
  try {
    const { idSong } = req.params;

    if (!idSong) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const song = await Song.findById(idSong);
    res.json(song);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSongs,
  createSong,
  getSong,
};
