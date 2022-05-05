const { builtinModules } = require("module");
const { Sequelize } = require("sequelize");
const { MYSQL_CONFIG } = require("../util/secrets");

const { dbHost, dbPort, dbName, dbUser, dbPassword } = MYSQL_CONFIG;

function getConnection() {
  const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    port: dbPort,
  });
  return sequelize;
}

async function test() {
  try {
    const sequelize = getConnection();
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {
  getConnection,
};
