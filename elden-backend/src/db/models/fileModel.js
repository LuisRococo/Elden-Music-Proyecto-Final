const { Sequelize, DataTypes } = require("sequelize");
const { getConnection } = require("../dbSequelizeconn");
const Singer = require("./singerModel");
const sequelize = getConnection();

const File = sequelize.define(
  "File",
  {
    id_file: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    file_content: {
      type: DataTypes.TEXT("medium"),
      allowNull: false,
    },
    is_song: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_song_complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
    tableName: "tbl_file",
    timestamps: false,
  }
);

module.exports = File;
