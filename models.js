const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const blogPostSchema = mongoose.Schema({
  author: {
    firstName: String,
    lastName: String
  },
  title: {type: String, required: true},
  content: {type: String, required: true},
  created: {type: Date, default: Date.now}
});

// Virtual authorName for first last names
blogPostSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.authorName,
    title: this.title,
    content: this.content,
    created: this.created
  };
}

const BlogPost = mongoose.model('Blogpost', blogPostSchema);

module.exports = {BlogPost};