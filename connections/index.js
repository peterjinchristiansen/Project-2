const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// returns 404 and ends proccess when unspecified url route is used
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;