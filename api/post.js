const express = require("express");
const router = express.Router();

// @routes  GET api/post
// @desc    Test route
// @access  Public
router.get("/", (req, res) => {
  res.send("Post route");
});

module.exports = router;