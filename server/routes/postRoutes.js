const router = require('express').Router();
const Post = require('../models/postModel');

router.route('/').get((req,res)=>{
    Post.find()
        .then(posts=> res.json(posts))
        .catch(err=> res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const newPost = new Post(req.body)

    newPost.save()
        .then(res.json('Post added!'))
        .catch(err=> res.status(400).json('Error: '+err));
});



module.exports = router;