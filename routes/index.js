const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var StartupOwner = require("../model/StartupOwner");

router.get("/api", (req, res) => {
  res.status(200).send({ message: "server is up" });
});

router.post("/api/register", (req, res) => {
  const email = req.body.email;
  let password = req.body.password;
  console.log(email, password);
  StartupOwner.findOne({ email: req.body.email })
    .then(user_res => {
      if (user_res) {
        return res.status(409).status({ message: "user already exist" });
      }
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
      password = hash;
      const payload = {
        email: email,
        password: password
      };
      console.log(payload);
      const startupOwner = new StartupOwner(payload);
      startupOwner
        .save()
        .then(user_save => {
          if (user_save) {
            return res
              .status(200)
              .send({ message: "Registration Successful!" });
          }
          res.status(500).send({ message: "error while registering!" });
        })
        .catch(err =>
          res.status(500).send({ message: "error while registering!" })
        );
    })
    .catch(err =>
      res.status(500).send({ message: "error while registering!" })
    );
});

router.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  StartupOwner.findOne({ email: email })
    .then(user_res => {
      if (user_res) {
        if (bcrypt.compareSync(password, user_res.password)) {
          const token = jwt.sign({ email: email, id: user_res._id }, "secret");
          return res.status(200).send({ token: token });
        }
        return res.status(401).send({ message: "password incorrect" });
      }
      return res.send(404).status({ message: "username incorrect" });
    })
    .catch(err => res.status(500).send({ message: "error occured" }));
});

module.exports = router;
