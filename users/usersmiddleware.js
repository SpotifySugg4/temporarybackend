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

const validateLoginUser = (req, res, next) => {
    const user = req.body;
    if (!user || !user.email || !user.password) { 
        res.status(400).json({message: "User object must contain email and password for login"})
    } else {
        next();
    }
}

function createToken(user) {
    const payload = {
        sub: user.id,
        email: user.email,
        password: user.password
    };
    const options = {
        expiresIn: '24h'
    }
    return jwt.sign(payload, secret, options)
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decToken) => {
      if (err) {
        res.status(401).json({
          message: "Invalid Authorization Received",
        });
      } else {
        req.jwt = decToken;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "Please provide the correct authorization",
    });
  }
};

module.exports = {
  validateRegUser,
    passHash,
    validateLoginUser,
    createToken,
  verifyToken
};
