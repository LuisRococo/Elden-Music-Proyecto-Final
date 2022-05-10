const { Sequelize, DataTypes } = require("sequelize");
const { getConnection } = require("../dbSequelizeconn");
const sequelize = getConnection();

const UserSong = sequelize.define(
  "UserSong",
  {
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    id_song: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    // Other model options go here
    tableName: "tbl_user_song",
    timestamps: false,
  }
);

module.exports = UserSong;
