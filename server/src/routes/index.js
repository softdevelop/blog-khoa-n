const express = require('express');
const router = express.Router();
const users = require('./users');
const auth = require('./auth');
const post = require('./post');
const comment = require('./comment');
const category = require('./category');


router.use('/user',users);
router.use('/auth',auth);
router.use('/post',post);
router.use('/comment',comment);
router.use('/category',category);



module.exports = router;