const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {BlogPosts} = require('./models');

function lorem() {
	return "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod " +
	  "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, "
	  "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
	  "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse " +
	  "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non " +
	  "proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}

BlogPosts.create(
	"That face when", lorem(), "Tim Roth"
);
BlogPosts.create(
	"No country for old men", lorem(), "Lilly Allen"
)

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
router.get('/:id', (req, res) => {
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
	const post = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(201).json(post);
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

router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blogpost \`${req.params.ID}\`.`);
	res.status(204).end();
});

module.exports = {router};