const router = require('express').Router();
const sequelize = require('../config/connection');
const { Quiz, Question } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/login', (req, res) => {
    res.render('login-page');
});

router.get('/quizsearch', (req, res) => {
    Quiz.findAll({
        attributes: [
            'title',
            'category',
            'created_at'
        ]
        // add in an includes that will get the user that created the quiz
    })
    res.render('quiz-search-page');
});

router.get('/end', (req, res) => {
    res.render('quiz-end-page');
})
module.exports = router;