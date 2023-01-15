const router = require('express').Router();
const apiUsers = require('./users');
const apiAuth = require('./auth');
const apiFavorite = require('./favorite');

router.use('/users', apiUsers);
router.use('/auth', apiAuth);
router.use('/favorite', apiFavorite);
module.exports = router;
