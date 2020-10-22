require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = process.env.SUPERSEC;

// validate the registration object
const validateRegUser = (req, res, next) => {
    const user = req.body;
    console.log("req.body", req.body)
  console.log("USER", user);
  if (!user || !user.name || !user.email || !user.password) {
    res.status(400).json({
      message:
        "User object must contain name, email, and password for registation",
    });
  } else {
    next();
  }
};

// hash password on registration

function passHash(userObject) {
  const user = userObject;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  return user;
}

module.exports = {
  validateRegUser,
  passHash,
};
