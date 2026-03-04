const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "Token not found" });
    }
    jwt.verify(token, process.env.JWTSECRETKEY, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ status: false, message: "invalid or expired token" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    (console.error(error), error.message);
    res
      .status(500)
      .json({ status: false, message: "internal error during authentication" });
  }
};

module.exports = checkAuth;
