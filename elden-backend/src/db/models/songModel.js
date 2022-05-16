const { Sequelize, DataTypes } = require("sequelize");
const { getConnection } = require("../dbSequelizeconn");
const File = require("./fileModel");
const sequelize = getConnection();

const Song = sequelize.define(
  "Song",
  {
    id_song: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    song_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    id_preview_song_file: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    id_song_file: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    id_album: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: "tbl_song",
    timestamps: false,
  }
);

module.exports = Song;
