const Album = require("./models/albumModel");
const File = require("./models/fileModel");
const Singer = require("./models/singerModel");
const Song = require("./models/songModel");
const TopSingerSongs = require("./models/topSingerSongs");
const UserSong = require("./models/userSongModel");
const User = require("./models/userModel");
const Playlist = require("./models/playlistModel");
const PlaylistSong = require("./models/PlaylistSongModel");

//FILE
File.hasMany(Singer, { foreignKey: "id_image" });
File.hasMany(Album, { foreignKey: "id_album" });

//SINGER
Singer.belongsTo(File, {
  foreignKey: { name: "id_image", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});
Singer.hasMany(Album, {
  foreignKey: { name: "id_singer", allowNull: false },
});

//ALBUM
Album.belongsTo(Singer, {
  foreignKey: { name: "id_singer", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});
Album.belongsTo(File, {
  foreignKey: { name: "id_image", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});
Album.hasMany(Song, {
  foreignKey: { name: "id_album", allowNull: false },
});

//SONG
Song.belongsTo(File, {
  foreignKey: { name: "id_preview_song_file", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});
Song.belongsTo(File, {
  foreignKey: { name: "id_song_file", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});
Song.belongsTo(Album, {
  foreignKey: { name: "id_album", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});
module.exports = {};

/*TOP SONGS*/
TopSingerSongs.belongsTo(Singer, {
  foreignKey: { name: "id_singer", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});
TopSingerSongs.belongsTo(Song, {
  foreignKey: { name: "id_song", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});

/*USER SONG*/
UserSong.belongsTo(User, {
  foreignKey: { name: "id_user", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});
UserSong.belongsTo(Song, {
  foreignKey: { name: "id_song", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});

//PLAYLIST
Playlist.belongsTo(User, {
  foreignKey: { name: "id_user", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});

Playlist.hasMany(PlaylistSong, {
  foreignKey: { name: "id_playlist", allowNull: false },
});

//PLAYLIST SONG
PlaylistSong.belongsTo(Playlist, {
  foreignKey: { name: "id_playlist", allowNull: false },
});

PlaylistSong.belongsTo(Song, {
  foreignKey: { name: "id_song", allowNull: false },
});
