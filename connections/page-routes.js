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
    .then(dbQuizData => {
        const quizzes = dbQuizData.map(quiz => quiz.get({plain: true}));
        res.render('quiz-search-page', { quizzes });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/end', (req, res) => {
    res.render('quiz-end-page');
})
module.exports = router;