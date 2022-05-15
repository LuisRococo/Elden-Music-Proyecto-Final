const { Sequelize, DataTypes } = require("sequelize");
const { getConnection } = require("../dbSequelizeconn");
const Singer = require("./singerModel");
const sequelize = getConnection();

const PlaylistSong = sequelize.define(
  "PlaylistSong",
  {
    id_playlist: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    id_song: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
  },
  {
    // Other model options go here
    tableName: "tbl_playlist_song",
    timestamps: false,
  }
);

module.exports = PlaylistSong;
