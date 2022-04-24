const { model, Schema } = require("mongoose");

const singerSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  stageName: { type: String, required: false },
  image: { type: String, default: "" },
  nationality: { type: String, required: true }
});

const SingerModel = model("singers", singerSchema);

module.exports.Singer = SingerModel;
