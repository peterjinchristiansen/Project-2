const router = require('express').Router();

const apiRoutes = require('./api');
const pageRoutes = require('./page-routes');

router.use('/api', apiRoutes);
router.use('/', pageRoutes);

// returns 404 and ends proccess when unspecified url route is used
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;