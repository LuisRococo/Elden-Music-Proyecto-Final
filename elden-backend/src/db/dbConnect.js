const { MYSQL_CONFIG } = require("../util/secrets");
const mysql = require("mysql2/promise");

const { dbHost, dbPort, dbName, dbUser, dbPassword } = MYSQL_CONFIG;

module.exports = async function getDataBaseConnection() {
  const connection = await mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    port: dbPort
  });

  return connection;
};
