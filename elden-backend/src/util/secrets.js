const AUTH_SECRET_KEY =
  "186b85d865d676b96f4d9317fa337455a13501aec3a0af062576885b57bc5a5e";

const { MSQL_DB, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT } =
  process.env;

const MYSQL_CONFIG = {
  dbHost: MYSQL_HOST || "localhost",
  dbPort: MYSQL_PORT || 3306,
  dbName: MSQL_DB || "db_elden_music",
  dbUser: MYSQL_USER || "root",
  dbPassword: MYSQL_PASSWORD || "rootroot",
};

module.exports = { AUTH_SECRET_KEY, MYSQL_CONFIG };
