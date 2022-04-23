const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false }
});

const UserModel = model("users", userSchema);

module.exports.User = UserModel;
