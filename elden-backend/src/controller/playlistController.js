const Address = require("../db/models/addressModel");
const Playlist = require("../db/models/playlistModel");
const Song = require("../db/models/songModel");
const Album = require("../db/models/albumModel");
const Singer = require("../db/models/singerModel");
const PlaylistSong = require("../db/models/PlaylistSongModel");
const { getErrorAnswer, getSuccessAnswer } = require("../util/util");

async function getPlaylists(req, res, next) {
  try {
    const { id_user } = req.body.decode;
    const playlists = await Playlist.findAll({
      where: {
        id_user: id_user,
      },
      include: [
        {
          model: PlaylistSong,
          include: [
            {
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
          ],
        },
      ],
    });
    res.json(playlists);
  } catch (error) {
    next(error);
  }
}

async function createPlaylist(req, res, next) {
  try {
    const { id_user } = req.body.decode;
    const { name } = req.body;

    await Playlist.create({
      playlist_name: name,
      id_user,
    });
    res.json(getSuccessAnswer(200, "Playlist created"));
  } catch (error) {
    next(error);
  }
}

async function deletePlaylist(req, res, next) {
  try {
    const { id_user } = req.body.decode;
    const { id } = req.params;

    if (!id) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    await PlaylistSong.destroy({
      where: {
        id_playlist: id,
      },
    });

    await Playlist.destroy({
      where: {
        id_user,
        id_playlist: id,
      },
    });

    res.json(getSuccessAnswer(200, "Playlist deleted"));
  } catch (error) {
    next(error);
  }
}

async function addSongToPlaylist(req, res, next) {
  try {
    const { idPlaylist, idSong } = req.body;

    await PlaylistSong.create({ id_playlist: idPlaylist, id_song: idSong });

    res.json(getSuccessAnswer(200, "Song added to playlist"));
  } catch (error) {
    next(error);
  }
}

async function removeSongFromPlaylist(req, res, next) {
  try {
    const { idPlaylist, idSong } = req.body;

    await PlaylistSong.destroy({
      where: { id_playlist: idPlaylist, id_song: idSong },
    });

    res.json(getSuccessAnswer(200, "Song added to playlist"));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
};
