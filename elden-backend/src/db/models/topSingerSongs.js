const { Sequelize, DataTypes } = require("sequelize");
const { getConnection } = require("../dbSequelizeconn");
const sequelize = getConnection();

const TopSingerSongs = sequelize.define(
  "TopSingerSongs",
  {
    id_singer: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    id_song: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
  },
  {
    // Other model options go here
    tableName: "tbl_top_singer_songs",
    timestamps: false,
  }
);

module.exports = TopSingerSongs;
