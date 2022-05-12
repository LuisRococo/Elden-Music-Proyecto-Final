const { Sequelize, DataTypes } = require("sequelize");
const { getConnection } = require("../dbSequelizeconn");
const File = require("./fileModel");
const Singer = require("./singerModel");
const sequelize = getConnection();

const Address = sequelize.define(
  "Address",
  {
    id_address: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    is_main_adress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
    tableName: "tbl_user_address",
    timestamps: false,
  }
);

module.exports = Address;
