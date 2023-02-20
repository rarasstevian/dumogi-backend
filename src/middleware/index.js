const admin = require("../config/firebase-config");
class Middleware {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodeValue = admin.auth().verifyIdToken(token);
      if (decodeValue) {
        return next();
      }
      return res.status(401).json({
        message: "Un authorized",
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new Middleware();
