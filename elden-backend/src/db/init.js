const Album = require("./models/albumModel");
const File = require("./models/fileModel");
const Singer = require("./models/singerModel");

//FILE
File.hasMany(Singer, { foreignKey: "id_image" });
File.hasMany(Albums, { foreignKey: "id_album" });

//SINGER
Singer.belongsTo(File, {
  foreignKey: { name: "id_image", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});
Singer.hasMany(Albums, {
  foreignKey: { name: "id_album", allowNull: false },
  hooks: true,
  onDelete: "cascade",
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

module.exports = {};
