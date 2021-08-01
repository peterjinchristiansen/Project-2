const router = require('express').Router();
const sequelize = require('../config/connection');
const { Quiz, Question } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/quizsearch', (req, res) => {
    res.render('quiz-search');
});

module.exports = router;