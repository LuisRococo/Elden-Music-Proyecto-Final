const { getSuccessAnswer, getErrorAnswer } = require("../util/util");
const jwt = require("jsonwebtoken");
const { AUTH_SECRET_KEY } = require("../util/secrets");
const getDataBaseConnection = require("../db/dbConnect");
var crypto = require("crypto");
const { getConnection } = require("../db/dbSequelizeconn");
const User = require("../db/models/userModel");

async function registerUser(req, res, next) {
  try {
    const { userName, email, password } = req.body;
    const isAdmin = false;

    const sha256Hasher = crypto.createHmac("sha256", AUTH_SECRET_KEY);
    const hashPassword = sha256Hasher.update(password).digest("base64");

    await User.create({
      user_name: userName,
      email: email,
      password: hashPassword,
      is_admin: isAdmin,
    });

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
        id_user: user.id_user,
        user_name: user.user_name,
        email: user.email,
        is_admin: user.is_admin,
      },
      AUTH_SECRET_KEY,
      { expiresIn: "12h" }
    );

    user = {
      userName: user.user_name,
      isAdmin: user.is_admin,
      token,
    };

    res.json(user);

    //send token
  } catch (error) {
    next(error);
  }
}

async function checkLoginUserName(userName, password) {
  const user = await User.findOne({
    where: {
      user_name: userName,
    },
  });

  const sha256Hasher = crypto.createHmac("sha256", AUTH_SECRET_KEY);
  const hashPassword = sha256Hasher.update(password).digest("base64");

  if (user && user.password === hashPassword) return user;
  return null;
}

async function checkLoginEmail(email, password) {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  const sha256Hasher = crypto.createHmac("sha256", AUTH_SECRET_KEY);
  const hashPassword = sha256Hasher.update(password).digest("base64");

  if (user && user.password === hashPassword) return user;
  return null;
}

module.exports = { registerUser, login };
