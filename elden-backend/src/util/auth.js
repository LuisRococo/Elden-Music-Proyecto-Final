const jwt = require("jsonwebtoken");
const { getErrorAnswer } = require("./util");
const { AUTH_SECRET_KEY } = require("./secrets");

async function verifyAdminAuth(req, res, next) {
  judgeToken(req, res, next, true);
}

async function verifyClientAuth(req, res, next) {
  judgeToken(req, res, next, false);
}

//este codigo pudo haber estado mejor
async function laterAuth(req, res, next) {
  try {
    let token = req.headers["authorization"];

    if (token) {
      token = token.split(" ")[1];
      if (!token) {
        req.body.decode = null;
        next();
      } else {
        jwt.verify(token, AUTH_SECRET_KEY, (err, decode) => {
          if (!err) {
            req.body.decode = decode;
            next();
          } else {
            req.body.decode = null;
            next();
          }
        });
      }
    } else {
      req.body.decode = null;
      next();
    }
  } catch (error) {
    req.body.decode = null;
    next();
  }
}

async function judgeToken(req, res, next, shouldBeAdmin) {
  let token = req.headers["authorization"];

  if (!token) {
    res.status(401).json(getErrorAnswer(401, "Unauthorized"));
    return;
  }

  token = token.split(" ")[1];

  if (!token) {
    res.status(401).json(getErrorAnswer(401, "Unauthorized"));
    return;
  }

  jwt.verify(token, AUTH_SECRET_KEY, (err, decode) => {
    if (err) {
      res.status(401);
      res.json(getErrorAnswer(401, "Unauthorized"));
    } else {
      if (decode && typeof decode !== "boolean") {
        if ((shouldBeAdmin && decode.is_admin === true) || !shouldBeAdmin) {
          req.body.decode = decode;
          next();
        } else {
          res.status(403);
          res.json(getErrorAnswer(403, "forbidden"));
        }
      } else {
        res.status(401);
        res.json(getErrorAnswer(401, "Token corrupted"));
      }
    }
  });
}

module.exports = { verifyAdminAuth, verifyClientAuth, laterAuth };
