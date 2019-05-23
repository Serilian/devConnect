const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @routes  POST api/users
// @desc    Register user
// @access  Public
router.post("/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please provide correct email").isEmail(),
    check("password", "Please provide password with at least 6 chars").isLength({ min: 6 })
  ],
  async (req, res) => {

    const errors = validationResult(req);
    const { name, email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          return res.json({ token });
        }
      );

    } catch (err) {
      console.log(err);
      return res.status(500).json({ issue: "Server error", ...err });
    }


  });

module.exports = router;