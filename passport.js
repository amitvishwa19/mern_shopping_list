const LocalStratergy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load user model
const User = require('./models/user.model')

module.exports = function(passport) {
    passport.use(
        new LocalStratergy({usernameField:'email'}, (email, password, done) => {

            //Match user
            User.findOne({email: email})
                .then(user => {
                    if(!user){
                        return done(null,false, {message: 'Incorrect Username/Email'});
                    }

                    //Match Password
                    bcrypt.compare(password,user.password,(err, isMatch) => {
                        if(err) throw err;
                        if(isMatch){
                            return done(null, user);
                        }{
                            return done(null, {message: 'Incorrect Password'});
                        }
                    })
                })
                .catch(err => console.log(err))

        })
    );

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    passport.deserializeUser((id,done) => {
        User.findById(id,(err,user) => {
            done(err,user);
        })
    });
}