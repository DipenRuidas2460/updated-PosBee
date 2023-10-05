const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateTokenMiddleware = (req, res, next) => {
  const secretKey = process.env.TOKEN_secret_key;
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ status: "error", msg: "UnAuthorized" });
  }
  token = token.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, secretKey);

    req.user = decodedToken;

    req.user.id = decodedToken.id

    next();
  } catch (error) {
    return res.status(401).json({ status: "error", error: "unauthorized" });
  }
};

module.exports = { validateTokenMiddleware };
