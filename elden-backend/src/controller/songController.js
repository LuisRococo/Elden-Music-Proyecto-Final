const Album = require("../db/models/albumModel");
const File = require("../db/models/fileModel");
const Singer = require("../db/models/singerModel");
const Song = require("../db/models/songModel");
const { getErrorAnswer, getSuccessAnswer } = require("../util/util");

async function getSongs(req, res, next) {
  try {
    const albums = await Song.findAll({
      include: [
        {
          model: File,
        },
        {
          model: Album,
          include: [
            {
              model: File,
            },
            {
              model: Song,
            },
          ],
        },
      ],
    });
    res.json(albums);
  } catch (error) {
    next(error);
  }
}

async function createSong(req, res, next) {
  try {
    const { songName, duration, previewSongFile, songFile, idAlbum } = req.body;
    //CREATE IMAGE
    const previewSongDb = await File.create({
      file_content: previewSongFile,
    });
    const SongDb = await File.create({
      file_content: songFile,
    });

    await Song.create({
      song_name: songName,
      duration: duration,
      previewSongFile: previewSongDb,
      id_preview_song_file: previewSongFile.id_file,
      id_song_file: songFile.id_file,
      id_album: idAlbum,
    });
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
