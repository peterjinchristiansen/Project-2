const router = require('express').Router();

const apiRoutes = require('./api');
const pageRoutes = require('./page-routes');
const searchRoutes = require('./searchpage-routes')
const createRoutes = require('./createpage-routes');
const takeRoutes = require('./takequiz-routes');
const profileRoutes = require('./profile-routes');

router.use('/api', apiRoutes);
router.use('/', pageRoutes);
router.use('/search',searchRoutes);
router.use('/create', createRoutes);
router.use('/take', takeRoutes);
router.use('/profile', profileRoutes);

// returns 404 and ends proccess when unspecified url route is used
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;