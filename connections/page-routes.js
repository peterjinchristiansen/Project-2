const router = require('express').Router();
const sequelize = require('../config/connection');
const { Quiz, Question } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', {
        user_id: req.session.user_id,
        loggedIn: req.session.loggedIn
    });
});

router.get('/login', (req, res) => {
    if (!req.session.loggedIn) {
        res.render('login-page');
    } else {
        res.render('homepage', {
            user_id: req.session.user_id,
            loggedIn: req.session.loggedIn
        });
    }
});

router.get('/end', (req, res) => {
    res.render('quiz-end-page', {
        user_id: req.session.user_id,
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;