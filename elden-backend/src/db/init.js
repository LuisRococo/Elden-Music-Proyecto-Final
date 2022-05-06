const File = require("./models/fileModel");
const Singer = require("./models/singerModel");

File.hasMany(Singer, { foreignKey: "id_image" });
Singer.belongsTo(File, { foreignKey: "id_image" });

module.exports = {};
