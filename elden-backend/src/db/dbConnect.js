const { Schema, model, connect } = require("mongoose");

const DB_PORT = 27017;
const DB_NAME = "EldenMusic";

module.exports = async function connectDatabase() {
  await connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`);
  console.log("Conectado a mongoDB");
};
