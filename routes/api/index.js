const router = require('express').Router();
// requires the routes we created in quiz-routes.js
const quizRoutes = require('./quiz-routes.js');

// Middleware to append /quizzes to the apis specified url
router.use('/quizzes', quizRoutes);

module.exports = router;