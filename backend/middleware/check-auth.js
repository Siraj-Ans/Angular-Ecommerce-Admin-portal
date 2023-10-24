const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("headers: ", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      "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",
      { algorithms: ["RS256"] }
    );
    console.log("decodedToken:", decodedToken);
    req.userData = { email: decodedToken.email };
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
