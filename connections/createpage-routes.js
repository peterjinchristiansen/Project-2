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
        const quiz = dbQuizData.get({plain: true});
        res.render('create-questions-page', { quiz });
        console.log(quiz);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;