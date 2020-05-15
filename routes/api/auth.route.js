const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middlewares/auth');
let User = require('../../models/user.model');

require('dotenv').config();


router.post('/login', (req, res) => {
    const { email, password } = req.body

    //Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Check for existing user
    User.findOne({ email })
        .then(user => {

            //Check for if user exists
            if (!user) return res.status(400).json({ msg: 'User not exists' });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' })

                    jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                msg: 'User Authenticated succesfully',
                                token: token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
        .catch(err => res.status(400).json({ message: err }))



});

router.post('/register', (req, res) => {
    const { name, email, password } = req.body

    //Simple validation
    if (!email || !password) {
        return res.status(400).json({ status: 400, msg: 'Kindly provide all input fields' });
    }

    //Check for existing user
    User.findOne({ email })
        .then(user => {

            //Check for if user exists
            if (user) return res.status(400).json({ status: 400, msg: 'User already exists' });

            const newUser = new User({
                name,
                email,
                password
            });


            bcrypt.genSalt(10, (err, salt) => {

                bcrypt.hash(newUser.password, salt, (err, hash) => {

                    //Hashing password
                    newUser.password = hash

                    //Save user
                    newUser.save()
                        .then((user) =>
                            jwt.sign(
                                { id: user.id },
                                process.env.JWT_SECRET,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token: token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )

                        )
                        .catch(err => res.status(400).json({ status: 405, message: err }))


                })
            })
        })
        .catch(err => res.status(40).json({ status: 400, msg: err }))



});

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id).select('-password')
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ msg: err.message }))
})

router.get('/users', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ msg: err.message }))
});

module.exports = router;

