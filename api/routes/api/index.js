const router = require('express').Router();
const apiUsers = require('./users');
const apiAuth = require('./auth');
const apiFavorite = require('./favorites');

router.use('/users', apiUsers);
router.use('/auth', apiAuth);
router.use('/favorites', apiFavorite);
module.exports = router;
