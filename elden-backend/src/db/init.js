const Album = require("./models/albumModel");
const File = require("./models/fileModel");
const Singer = require("./models/singerModel");
const Song = require("./models/songModel");
const TopSingerSongs = require("./models/topSingerSongs");

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
