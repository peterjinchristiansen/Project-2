const router = require('express').Router();
const sequelize = require('../config/connection');
const { Quiz, Question } = require('../models');

router.get('/home', (req, res) => {
    res.render('homepage');
});

router.get('/', (req, res) => {
    res.render('login-page');
});

router.get('/end', (req, res) => {
    res.render('quiz-end-page');
});


module.exports = router;