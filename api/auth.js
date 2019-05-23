const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const { check, validationResult } = require("express-validator/check");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @routes  GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    return res.status(500).json("Server error");
  }
});


// @routes  POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post("/",
  [
    check("email", "Please provide correct email").isEmail(),
    check("password", "Please provide password with at least 6 chars").exists()
  ],
  async (req, res) => {

    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const match =  await bcrypt.compare(password, user.password);

      if(!match) {
        return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
      }

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