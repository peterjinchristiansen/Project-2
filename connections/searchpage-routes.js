const router = require('express').Router();
const sequelize = require('../config/connection');
const { Quiz, Question } = require('../models');

router.get('/', (req, res) => {
    Quiz.findAll({
        attributes: [
            'title',
            'category'
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

router.get('/:category', (req, res) => {
    Quiz.findAll({
        where: {
            category: req.params.category
        },
        attributes: [
            'title',
            'category'
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

router.get('/:category/:title', (req, res) => {
    let lookUp = req.params.title.toLocaleLowerCase();

    Quiz.findAll({
        where: {
            title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + lookUp + '%'),
            category: req.params.category
        },
        attributes: [
            'title',
            'category'
        ]
        // add in an includes that will get the user that created the quiz
    })
    .then(dbQuizData => {
        const quizzes = dbQuizData.map(quiz => quiz.get({plain: true}));
        const search = {searchedfor: true, searched: req.params.title};
        res.render('quiz-search-page', { quizzes, search });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;