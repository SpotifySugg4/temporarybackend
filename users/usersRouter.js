const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const Users = require("./usersmodel.js");
const { validateRegUser, passHash } = require("./usersmiddleware.js");

router.post("/register", validateRegUser, (req, res) => {
  const user = req.body;
  console.log(req);
  const newUser = passHash(user);
  const email = user.email;
  Users.findUserBy({ email })
    .then((use) => {
      if (use.length > 0) {
        res.status(400).json({ message: "Email already exists" });
      } else {
        Users.add(newUser)
          .then((usr) => {
            res.status(201).json({
              data: usr,
            });
          })
          .catch((error) => res.send(error));
      }
    })
    .catch((error) => res.send(error));
});

module.exports = router;
