const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const blogPostSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    firstName: String,
    lastName: String
  }
});

// Virtual authorName for first last names
blogPostSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.authorName
  };
}

const BlogPost = mongoose.model('Blogpost', blogPostSchema);

module.exports = {BlogPost};