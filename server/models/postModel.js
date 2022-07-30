const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    recieverName : {
        type : String,
        required : true,
        trim : true
    },
    recievedDate : {
        type : Date,
        default : new Date()
    },
    deliveryService : {
        type : String,
        required : true
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
