const router = require('express').Router();
const sequelize = require('../config/connection');
const { Quiz, Question } = require('../models');

router.get('/', (req, res) => {
    Quiz.findAll({
        attributes: [
            'id',
            'title',
            'category',
            'created_at',
            [
                sequelize.literal('(SELECT COUNT(*) FROM Question WHERE Quiz.id = Question.quiz_id)'), 'question_count'
            ]
        ]
        // add in an includes that will get the user that created the quiz
    })
        .then(dbQuizData => {
            const quizzes = dbQuizData.map(quiz => quiz.get({ plain: true }));
            res.render('quiz-search-page', {
                quizzes,
                user_id: req.session.user_id,
                loggedIn: req.session.loggedIn
            });
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
            'id',
            'title',
            'category',
            'created_at',
            [
                sequelize.literal('(SELECT COUNT(*) FROM Question WHERE Quiz.id = Question.quiz_id)'), 'question_count'
            ]
        ]
        // add in an includes that will get the user that created the quiz
    })
        .then(dbQuizData => {
            const quizzes = dbQuizData.map(quiz => quiz.get({ plain: true }));
            res.render('quiz-search-page', {
                quizzes,
                user_id: req.session.user_id,
                loggedIn: req.session.loggedIn
            });
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
            'id',
            'title',
            'category',
            'created_at',
            [
                sequelize.literal('(SELECT COUNT(*) FROM Question WHERE Quiz.id = Question.quiz_id)'), 'question_count'
            ]
        ]
        // add in an includes that will get the user that created the quiz
    })
        .then(dbQuizData => {
            const quizzes = dbQuizData.map(quiz => quiz.get({ plain: true }));
            const search = { searchedfor: true, searched: req.params.title };
            res.render('quiz-search-page', {
                quizzes,
                search,
                user_id: req.session.user_id,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;