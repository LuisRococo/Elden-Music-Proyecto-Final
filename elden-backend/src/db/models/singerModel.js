const { Sequelize, DataTypes } = require("sequelize");
const { getConnection } = require("../dbSequelizeconn");
const File = require("./fileModel");
const sequelize = getConnection();

const Singer = sequelize.define(
  "Singer",
  {
    id_singer: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    singer_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    stage_name: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(20),
      allowNull: false,
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
    tableName: "tbl_singer",
    timestamps: false,
  }
);

module.exports = Singer;
