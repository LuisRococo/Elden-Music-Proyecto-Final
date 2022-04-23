const { User } = require("../src/db/models/userModel");
const { getSuccessAnswer } = require("../util/util");

async function registerUser(userName, email, password) {
  const isAdmin = false;
  const newUser = new User({ userName, email, password, isAdmin });
  await newUser.save();
  return getSuccessAnswer();
}

module.exports = { registerUser };
