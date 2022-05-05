const { Sequelize, DataTypes } = require("sequelize");
const { getConnection } = require("../dbSequelizeconn");
const sequelize = getConnection();

const User = sequelize.define(
  "User",
  {
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
    tableName: "tbl_user",
    timestamps: false,
  }
);

module.exports = User;
