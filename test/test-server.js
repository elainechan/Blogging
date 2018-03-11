const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const expect = chai.expect;
chai.use(chaiHttp)

describe('Blog Posts', function() {
	before(function() {
		return runServer;
	});
	after(function() {
		return closeServer;
	});
	it('should list blog posts on GET', function() {
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
		});
	});
	it('should add a blog post on POST', function() {
		const newItem = {
			title: 'title',
			content: 'content',
			author: 'author'
		};
		return chai.request(app)
		.post('/blog-posts')
		.send(newItem)
		.then(function(res) {
			expect(res).to.have.status(201);
			expect(res.body).to.have.all.keys(['id', 'publishDate', 'title', 'content', 'author']);
		});
	});
	it('should error if POST missing expected values', function() {
		const badRequestData = {};
		return chai.request(app)
		.post('/blog-posts')
		.send(badRequestData)
		.catch(function(res) {
			expect(res).to.have.status(400);
		});
	});
	it('should update a blog post on PUT', function() {
		
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			const updatedPost = Object.assign(res.body[0], {
				title: 'title',
				content: 'content'
			});
		});
		return chai.request(app)
		.put(`/blog-posts/${res.body[0].id}`)
		.send(updatedPost)
		.then(function(res) {
			expect(res).to.have.status(204);
		});
	});
	it('should delete a blog post on DELETE', function() {
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			return chai.request(app)
			.delete(`/blog-posts/${res.body[0].id}`);
		})
		.then(function(res) {
			expect(res).to.have.status(204);
		});
	});
});