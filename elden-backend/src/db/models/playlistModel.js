const { Sequelize, DataTypes } = require("sequelize");
const { getConnection } = require("../dbSequelizeconn");
const Singer = require("./singerModel");
const sequelize = getConnection();

const Playlist = sequelize.define(
  "Playlist",
  {
    id_playlist: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    playlist_name: {
      type: DataTypes.TEXT(20),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: "tbl_playlist",
    timestamps: false,
  }
);

module.exports = Playlist;
