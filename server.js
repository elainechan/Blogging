const express = require('express');
const morgan = require('morgan');
const {PORT, DATABASE_URL} = require('./config');

const {BlogPosts} = require('./models');
const {router} = require('./router');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();

app.use('/blog-posts', router);
app.use(morgan('common'));

let server;
function runServer(databaseUrl, port=PORT) {
	const port = process.env.PORT || 8080;
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening at port ${port}...`);
				resolve();
			}).on('error', err => {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}
function closeServer() {
	return new Promise((resolve, reject) => {
		console.log(`Closing server...`);
		server.close(err => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
}
if (require.main === module) {
	runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};