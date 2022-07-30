const router = require('express').Router();
const Post = require('../models/postModel');

router.route('/').get((req,res)=>{
    Post.find()
        .then(posts=> res.json(posts))
        .catch(err=> res.status(400).json('Error: '+err));
});

router.route('/id/:id').get((req,res)=>{
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err=> res.status(400).json('Error: '+err));
});

router.route('/reciever/:reciever').get((req,res)=>{
    Post.find({recieverName : req.params.reciever})
        .then(posts => res.json(posts))
        .catch(err=> res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const newPost = new Post(req.body)

    newPost.save()
        .then(res.json('Post added!'))
        .catch(err=> res.status(400).json('Error: '+err));
});

router.route('/delete/:id').delete((req,res)=>{
    Post.findByIdAndDelete(req.params.id)
        .then(res.json('Post deleted'))
        .catch(err=> res.status(400).json('Error: '+err));
});

module.exports = router;