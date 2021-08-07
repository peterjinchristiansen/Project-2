const router = require('express').Router();
const sequelize = require('../config/connection');
const { Quiz, Question } = require('../models');

router.get('/:id', (req, res) => {
    if (req.session.loggedIn) {
        Quiz.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'category',
                'created_at'
            ],
            include: [
                {
                    model: Question,
                    attributes: ['id', 'prompt', 'choices', 'answer']
                }
            ]
        })
            .then(dbQuizData => {
                const quiz = dbQuizData.get({ plain: true });
                res.render('create-questions-page', { 
                    quiz,
                    user_id: req.session.user_id,
                    loggedIn: req.session.loggedIn
                });
                console.log(quiz);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
        res.render('homepage', {
            user_id: req.session.user_id,
            loggedIn: req.session.loggedIn
        });
    }
});

module.exports = router;