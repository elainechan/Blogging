const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {BlogPost} = require('./models');

// General finding; returns array of documents
router.get('/', (req, res) => {
	BlogPost
	.find()
	.then(blogPosts => {
		res.json({
			blogPosts: blogPosts.map(
				(blogPost) => blogPost.serialize())
		});
	})
	.catch(err => {
		console.error(err);
		res.status(500).json({message: 'Something went wrong.'})
	});
});
// Finding by id; returns single document
router.get('/:id', jsonParser, (req, res) => {
	BlogPost
	.findById(req.params.id)
	.then(blogPost => res.json(blogPost.serialize()))
	.catch(err => {
		console.error(err);
		res.status(500).json({message: 'Internal server error.'})
	});
});

router.post('/', jsonParser, (req, res)=> {
	const requiredFields = ['title', 'content', 'author'];
	requiredFields.map((field) => {
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body.`
			console.error(message);
			return res.status(400).send(message);
		}
	});
	BlogPost
	.create({
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	})
	.then(blogPost => res.status(201).json(blogPost.serialize()))
	.catch(err => {
		console.error(err);
		res.status(500).json({err: 'Something wen wrong; cannot create post.'})
	});
});

router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate', 'id'];
	requiredFields.map((field) => {
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body.`;
			console.error(message);
			return res.status(400).send(message);
		}
		if (req.params.id !== req.body.id) {
			const message = `Request path id \`${req.params.id}\` and request body id \`${req.body.id}\` must match.`;
			console.error(message);
			return res.status(400).send(message);
		}
		console.log(`Updating post \`${req.params.id}\`...`);
	});
	BlogPost
	.findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
	.then(updatedPost => res.status(204).end())
	.catch(err => res.status(500).json({message: 'Something went wrong; cannot update post.'}))
});

router.delete('/:id', jsonParser, (req, res) => {
	BlogPost
	.findByIdAndRemove(req.params.id)
	.then(()=> {
		console.log(`Deleted blog post with id \`${req.params.id}\``);
		res.status(204).end();
	});
});

module.exports = {router};