const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

//Post model
const Item = require('../../models/post.model');

//@route GET api/Post
//@desc Get all Post
//@access public
router.get('/', (req, res) => {
    Item.find()
        .sort({ createdAt: -1 })
        .then(posts => res.json(posts));
});

//@route POST api/Post
//@desc get post by id
//@access private
router.get('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(post => { res.json(post) })
        .catch(err => res.status(400).json({ status: 400, message: 'Post not found' }));
});

//@route POST api/Post
//@desc Create a Post
//@access public
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    });

    newItem.save().then(post => res.json({ status: 202, post: post }));
});


//@route DELETE api/Post/delete/:id
//@desc Delete a Post
//@access public
router.delete('/delete/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(post => post.remove().then(() => res.json({ status: 202, message: 'Post deleted successfully' })))
        .catch(err => res.status(400).json({ status: 401, message: 'Post not found' }));
});


//@route Update api/Post/:id
//@desc Update a Post
//@access public
router.post('/update/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(post => post.updateOne({
            title: req.body.title,
            body: req.body.body,
            author: req.body.author
        }).then((p) => res.json({ status: 202, message: 'Post updated successfully' })))
        .catch(err => res.status(400).json({ status: 401, message: err }));
});

module.exports = router;
