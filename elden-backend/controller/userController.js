const { User } = require("../src/db/models/userModel");
const { getSuccessAnswer } = require("../util/util");

async function registerUser(req, res, next) {
  try {
    const { userName, email, password } = req.body;
    const isAdmin = false;
    const newUser = new User({ userName, email, password, isAdmin });

    await newUser.save();
    res.json(getSuccessAnswer());
  } catch (error) {
    next(error);
  }
}

module.exports = { registerUser };
