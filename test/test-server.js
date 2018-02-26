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
		.get('/')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
		});
	});
	it('should add a blog post on POST', function() {
		const newItem = {
			id: 'id',
			title: 'title',
			content: 'content',
			author: 'author',
			publishDate: 'publishDate'
		};
		return chai.request(app)
		.post('/')
		.send(newItem)
		.then(function(res) {
			expect(res).to.have.status(201);
		});
	});
	/*
	it('should delete a blog post on DELETE', function() {

	});
	*/
});