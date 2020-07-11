  
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.notes = req.body.notes;
    user.save((err, doc) => {
        console.log("doc",doc);
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });



}

module.exports.authenticate = (req,res,next) => {
    //call for passport authentication
    passport.authenticate('local', (err,user,info) => {
        //error from passport middleware
        if(err) return res.satus(400).json(err);
        //registered user
        else if (user) return res.status(200).json({'token': user.generateJwt()});
        //unknown user or wrong password
        else return res.status(404).json(info);
    })(req,res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','notes']) });
        }
    );
}


module.exports.postNote = (req,res,next) => {
    console.log(req.body);
    User.findOneAndUpdate(
        { email: req.body.email }, 
        { $push: { notes: {date: req.body.date,location:req.body.geolocation,title:req.body.title,description:req.body.description}} },
       function (error, success) {
             if (error) {
                 console.log(error);
             } else {
                 console.log(success);
             }
         });
     
}