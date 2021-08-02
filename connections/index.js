const router = require('express').Router();

const apiRoutes = require('./api');
const pageRoutes = require('./page-routes');
const searchRoutes = require('./searchpage-routes')

router.use('/api', apiRoutes);
router.use('/', pageRoutes);
router.use('/search',searchRoutes);

// returns 404 and ends proccess when unspecified url route is used
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;