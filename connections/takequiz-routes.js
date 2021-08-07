const router = require('express').Router();
const sequelize = require('../config/connection');
const { Quiz, Question } = require('../models');

router.get('/:id', (req, res) => {
    Quiz.findOne({
        where:{
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
        var quiz = dbQuizData.get({plain: true});
        
        for (let i = 0; i < quiz.questions.length; i++) {
            quiz.questions[i].choices = quiz.questions[i].choices.split(',');
            console.log(quiz.questions[i].choices);
        }

        console.log(quiz);
        res.render('take-quiz', { quiz,
            user_id: req.session.user_id,
            loggedIn: req.session.loggedIn,
         });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;