const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const Users = require("./usersmodel.js");
const {
  validateRegUser,
  validateLoginUser,
  passHash,
  createToken,
} = require("./usersmiddleware.js");

router.post("/register", validateRegUser, (req, res) => {
  const user = req.body;
  const newUser = passHash(user);
  const email = user.email;
  Users.findUserBy({ email })
    .then((use) => {
      if (use.length > 0) {
        res.status(400).json({ message: "Email already exists" });
      } else {
        Users.add(newUser)
          .then((usr) => {
            token = createToken(user);
            res.status(201).json({
              message: "User Created and Logged In",
              data: usr,
              token,
            });
          })
          .catch((error) => res.send(error));
      }
    })
    .catch((error) => res.send(error));
});

router.post("/login", validateLoginUser, (req, res) => {
  const { email, password } = req.body;
  Users.findUserBy({ email }).then(([user]) => {
    if (user && bcryptjs.compareSync(password, user.password)) {
      token = createToken(user);
      res.status(200).json({
        message: "User Logged in",
        user,
        token,
      });
    }
  });
});

module.exports = router;
