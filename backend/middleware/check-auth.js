//Function that will parse request and decide wether it can continue or be blocked

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed." });
  }
};
