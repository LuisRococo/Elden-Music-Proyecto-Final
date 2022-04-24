const { model, Schema } = require("mongoose");

const genreSchema = new Schema({
  _id: { type: String, required: true },
  description: { type: String, required: true }
});

const GenreModel = model("genres", genreSchema);

module.exports.Genre = GenreModel;
