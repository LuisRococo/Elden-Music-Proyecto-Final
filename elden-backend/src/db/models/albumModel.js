// const { model, Schema } = require("mongoose");

// const albumSchema = new Schema({
//   name: { type: String, required: true },
//   image: { type: String, default: "" },
//   singer: { type: Schema.Types.ObjectId, ref: "singers", required: true },
//   releaseDate: { type: Date, default: new Date(), required: true },
//   price: { type: Boolean, required: true },
//   genre: { type: Schema.Types.ObjectId, ref: "genres", required: true },
//   isSingle: { type: Boolean, default: false },
//   stock: { type: Number, default: 20 }
// });

// const AlbumModel = model("albums", albumSchema);

module.exports.Album = null;
