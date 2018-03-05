const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {BlogPosts} = require('./models');

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res)=> {
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	requiredFields.map((field) => {
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body.`
			console.error(message);
			return res.status(400).send(message);
		}
	});
	const post = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	res.status(201).json(post);
});

router.delete('/:id', (req, res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate', 'id'];
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blogpost \`${req.params.ID}\`.`);
	res.status(204).end();
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
		const updatePost = BlogPosts.update({
			id: req.params.id,
			title: req.body.title,
			content: req.body.content,
			author: req.body.author,
			publishDate: req.body.publishDate
		});
		res.status(204).end();
	});
});

module.exports = {router};