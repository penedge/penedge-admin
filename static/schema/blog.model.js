const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogSchema = new Schema ({
    title:{type:String},
    textStyle:{type:String},
    image:{type:String},
    content:{type:String},
    author:{type:String},
    tags: {type:String},
    category: {type:String},
    date: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;