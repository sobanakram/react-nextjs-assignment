const router = require('express').Router();

router.use('/auth', require('./authRoutes'));
router.use('/movie', require('./movieRoutes'));

module.exports = router;
