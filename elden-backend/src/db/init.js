const File = require("./models/fileModel");
const Singer = require("./models/singerModel");

File.hasMany(Singer, { foreignKey: "id_image" });
Singer.belongsTo(File, {
  foreignKey: { name: "id_image", allowNull: false },
  hooks: true,
  onDelete: "cascade",
});

module.exports = {};
