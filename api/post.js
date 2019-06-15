const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const Post = require("../models/Post");
const Profile = require("../models/Profile");


// @routes  POST api/posts
// @desc    Create new post
// @access  Private
router.post("/", [
    check("text", "Post text is required").not().isEmpty(),
    auth
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      const post = new Post(newPost);
      await post.save();

      return res.json(post);

    } catch (e) {
      console.log(e);
      return res.status(500).json("Server error");
    }


  });


// @routes  GET api/posts
// @desc    get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json(posts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json("Server error");
  }
});

// @routes  GET api/posts/:id
// @desc    get post by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    return res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(500).json("Server error");
  }
});


// @routes  DELETE api/posts/:id
// @desc    delete post by id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json({
      msg: "No such post"
    });

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    await post.remove();

    return res.json({ msg: "Post deleted successfully" });

  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(500).json("Server error");
  }
});

// @routes  PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.filter(like => {
      return like.user.toString() === req.user.id;
    }).length > 0) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

// @routes  PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.filter(like => like.user.toString() === req.user.id)
      .length === 0) {
      return res.status(400).json({ msg: "Post not liked yet" });
    }

    const removeIndex = post.likes.map(like =>
      like.user.toString().indexOf(req.params.id));


    post.likes.splice(removeIndex, 1);

    await post.save();

    return res.json(post.likes);

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

// @routes  POST api/posts/comment/:id
// @desc    Create new comment for the post with :id
// @access  Private
router.post("/comment/:id", [
    check("text", "Post text is required").not().isEmpty(),
    auth
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      return res.json(post.comments);

    } catch (e) {
      console.log(e);
      return res.status(500).json("Server error");
    }


  });

// @routes  DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment for a post with :id
// @access  Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);

    const commentToRemove = post.comments.find(comment => comment.id === req.params.comment_id);

    if (!commentToRemove) {
      return res.status(404).json({ msg: "Comment is not found" });
    }
    console.log(commentToRemove);
    console.log(req.user.id);
    if (commentToRemove.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User unauthorized" });
    }

    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    return res.json(post.comments);

  } catch (err) {
    console.error(err.message);
    return res.status(500).json("Server error");
  }
});

module.exports = router;