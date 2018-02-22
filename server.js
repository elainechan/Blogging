const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('.models');

const app = express;

app.use(morgan('common'));

app.get('/blog-posts');
app.post('/blog-posts');
app.put('/blog-posts/:id');
app.delete('/blog-posts/:id');

