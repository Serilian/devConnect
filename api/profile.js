const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require('../models/Post');
const { check, validationResult } = require("express-validator/check");
const request = require("request");
const config = require("config");

// @routes  GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);
    if ((!profile)) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    return res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @routes  POST api/profile/
// @desc    Create or update user profile
// @access  Private
router.post("/", [auth, [
  check("status", "Status is required").not().isEmpty(),
  check("skills", "Skills section is required").not().isEmpty()

]], async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  const profileFields = {};

  profileFields.user = req.user.id;

  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) profileFields.skills = skills.split(",").map(skill => skill.trim());

  profileFields.social = {};

  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    //update
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true });
      return res.json(profile);
    }


    //create
    profile = new Profile(profileFields);
    await profile.save();

    return res.json(profile);


  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }

  return res.json(profileFields.skills);

});

// @routes  GET api/profiles/
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res) => {

  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    return res.json(profiles);

  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }

});

// @routes  GET api/profiles/user/:userid
// @desc    Get profile by user id
// @access  Public
router.get("/user/:user_id", async (req, res) => {

  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    return res.json(profile);

  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.status(500).json("Server error");
  }

});

// @routes  DELETE api/profile/
// @desc    Get profile, user, post
// @access  Private
router.delete("/", auth, async (req, res) => {

  try {

    await Post.deleteMany({user: req.user.id});
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    return res.json({ msg: "User deleted" });

  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.status(500).json("Server error");
  }
});

// @routes  PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put("/experience",
  [
    auth,
    check("title", "title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile.experience) profile.experience = [];

      profile.experience.unshift(newExperience);
      await profile.save();

      return res.json(profile);

    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  });

// @routes  DELETE api/profiles/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    if (removeIndex !== -1) {
      profile.experience.splice(removeIndex, 1);
    } else {
      return res.json("No such experience to remove");
    }

    await profile.save();

    return res.json(profile);

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @routes  PUT api/profiles/education
// @desc    Add profile education
// @access  Private
router.put("/education",
  [
    auth,
    check("school", "school is required").not().isEmpty(),
    check("degree", "degree is required").not().isEmpty(),
    check("fieldofstudy", "Field of study is required").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile.education) profile.education = [];

      profile.education.unshift(newEducation);
      await profile.save();

      return res.json(profile);

    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  });

// @routes  DELETE api/profiles/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

    if (removeIndex !== -1) {
      profile.education.splice(removeIndex, 1);
    } else {
      return res.json("No such education to remove");
    }

    await profile.save();

    return res.json(profile);

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});


// @routes  GET api/profiles/github/:username
// @desc    Get user repos from github
// @access  Public
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created: asc&client_id=${config.get("githubClientId")}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, (error, response, body) => {
      if (error) {
        console.log(error);
      }

      if (response.statusCode !== 200) {
        return res.status(400).json({ msg: "No github profile found" });
      }

      return res.json(JSON.parse(body));


    });


  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server error");
  }
});


module.exports = router;