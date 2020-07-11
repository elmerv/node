const express = require('express') ;
const router = express.Router();

const ctrlUser = require('../controller/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register',ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.post('/postNote',ctrlUser.postNote)
module.exports = router; 
