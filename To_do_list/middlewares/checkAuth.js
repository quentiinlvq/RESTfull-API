require('dotenv').config();
const jwt = require("jsonwebtoken");

const secret = process.env.MDP_JWT;

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) res.sendStatus(401);
  const [type, token] = authHeader.split(/\s+/);
  if (type !== "Bearer") res.sendStatus(401);
  try {
    const payload = jwt.verify(token, secret);
    req.userId = payload.sub;
    req.userRole = payload.role;
    next();
  } catch (e) {
    res.sendStatus(401);
    console.error(e);
  }
};