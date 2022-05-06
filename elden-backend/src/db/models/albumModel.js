const { Sequelize, DataTypes } = require("sequelize");
const { getConnection } = require("../dbSequelizeconn");
const File = require("./fileModel");
const Singer = require("./singerModel");
const sequelize = getConnection();

const Album = sequelize.define(
  "Album",
  {
    id_album: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    album_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    is_single: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    id_singer: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      onDelete: "cascade",
      references: {
        model: Singer, // name of Target model
        key: "id_singer", // key in Target model that we're referencing
      },
    },
    id_image: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      onDelete: "cascade",
      references: {
        model: File, // name of Target model
        key: "id_file", // key in Target model that we're referencing
      },
    },
  },
  {
    // Other model options go here
    tableName: "tbl_album",
    timestamps: false,
  }
);

module.exports = Album;
