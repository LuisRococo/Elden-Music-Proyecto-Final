const { getSuccessAnswer, getErrorAnswer } = require("../util/util");
const jwt = require("jsonwebtoken");
const { AUTH_SECRET_KEY } = require("../util/secrets");
const getDataBaseConnection = require("../db/dbConnect");

async function registerUser(req, res, next) {
  try {
    const { userName, email, password } = req.body;
    const isAdmin = false;

    const conn = await getDataBaseConnection();
    await conn.execute(
      "insert into tbl_user (user_name, email, password, is_admin) values (?, ?, ?, ?)",
      [userName, email, password, isAdmin]
    );
    await conn.end();

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
        _id: user.id_user,
        userName: user.user_name,
        email: user.email,
        isAdmin: user.is_admin
      },
      AUTH_SECRET_KEY,
      { expiresIn: "3h" }
    );

    user = {
      userName: user.user_name,
      token
    };

    res.json(user);

    //send token
  } catch (error) {
    next(error);
  }
}

async function checkLoginUserName(userName, password) {
  const conn = await getDataBaseConnection();
  const [rows] = await conn.execute(
    "select * from tbl_user where user_name = ? limit 1",
    [userName]
  );
  await conn.end();

  const user = rows[0];
  if (user && user.password === password) return user;
  return null;
}

async function checkLoginEmail(email, password) {
  const conn = await getDataBaseConnection();
  const [rows] = await conn.execute(
    "select * from tbl_user where email = ? limit 1",
    [email]
  );
  await conn.end();

  const user = rows[0];
  if (user && user.password === password) return user;
  return null;
}

module.exports = { registerUser, login };
