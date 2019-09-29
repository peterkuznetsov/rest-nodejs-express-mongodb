const router = require('express').Router();
const Post = require('../models/Post');
const verify = require('../middleware/verifyToken');

// Get Posts
router.get('/', verify , async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		res.json({ message: err });
	}
});

// Get Single Post
router.get('/:postId', verify , async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		res.json(post);
	} catch (err) {
		res.json({ message: err });
	}
});

// Add Post
router.post('/', verify , async (req, res) => {
	const post = new Post({
		title: req.body.title,
		description: req.body.description
	});

	try {
		const savePost = await post.save();
		res.json(savePost);
	} catch (err) {
		res.json({ message: err });
	}
});

// Update Post
router.put('/:postId', verify , async (req, res) => {
	try {
		const updatedPost = await Post.updateOne({ _id: req.params.postId }, req.body);
		res.json(updatedPost);
	} catch (err) {
		res.json({ message: err });
	}
});

// Delete Post
router.delete('/:postId', verify , async (req, res) => {
	try {
		const removedPost = await Post.deleteOne({ _id: req.params.postId });
		res.json(removedPost);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;