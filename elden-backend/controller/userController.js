const { User } = require("../src/db/models/userModel");
const { getSuccessAnswer, getErrorAnswer } = require("../util/util");
const jwt = require("jsonwebtoken");

const AUTH_SECRET_KEY =
  "186b85d865d676b96f4d9317fa337455a13501aec3a0af062576885b57bc5a5e";

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

async function login(req, res, next) {
  try {
    const { userName, email, password } = req.body;
    let user = null;

    if (!password) {
      res.status(400).json(getErrorAnswer(400, "Password is required"));
      return;
    }

    if (userName) {
      user = await checkLoginUserName(userName, password);
    } else if (email) {
      user = await checkLoginEmail(email, password);
    } else {
      res
        .status(400)
        .json(getErrorAnswer(400, "Email or user name is required"));
      return;
    }

    if (!user) {
      res.status(404).json(getErrorAnswer(404, "User not found"));
      return;
    }

    const token = jwt.sign(
      {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin
      },
      AUTH_SECRET_KEY,
      { expiresIn: "3h" }
    );

    user = {
      userName: user.userName,
      token
    };

    res.json(user);

    //send token
  } catch (error) {
    next(error);
  }
}

async function checkLoginUserName(userName, password) {
  const user = await User.findOne({ userName });
  if (user && user.password === password) return user;
  return null;
}

async function checkLoginEmail(email, password) {
  const user = await User.findOne({ email });
  if (user && user.password === password) return user;
  return null;
}

module.exports = { registerUser, login };
