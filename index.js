
var express = require('express');
var app = new express();

var port = process.env.PORT || 8080;

const User = require('./user');
const rtsIndex = require('./routes/index.router');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

require('./config/passportConfig')

app.use(bodyParser.json());
app.use(cors());
app.use(require('body-parser').urlencoded({extended: true}));

app.use(passport.initialize());
app.use('/api',rtsIndex);


const uri = "mongodb+srv://felmerv:elmer@ionic-project.cjqed.mongodb.net/Ionic-Project?retryWrites=true&w=majority";

mongoose.connect(uri, { useFindAndModify: false });


// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

mongoose.connect(uri, { useNewUrlParser: true },(err,client) =>{
    if (err) throw err;
    console.log('Successfully connected to DB server');
})

app.listen(port,function(){
    console.log('listening on port',port)
});


