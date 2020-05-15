const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

//Item model
const Item = require('../../models/item.model');

//@route GET api/items
//@desc Get all items
//@access public
router
    .get('/', (req, res) => {
        Item.find()
            .sort({ created_at:-1})
            .then(items => res.json(items));
    });


//@route POST api/items
//@desc Create a items
//@access public
router
    .post('/', auth,(req, res) => {
        const newItem = new Item({
            name: req.body.name
        });

        newItem.save().then(item => res.json('Item added successfully'));
    });


//@route DELETE api/items/delete/:id
//@desc Delete a items
//@access public
router
    .delete('/delete/:id', (req, res) => {
        Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({success:false}));
    });


//@route Update api/items/:id
//@desc Update a items
//@access public
router
.post('/update/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.updateOne({name:req.body.name}).then(() => res.json({success:true})))
    .catch(err => res.status(404).json({success:false}));
});

module.exports = router;
