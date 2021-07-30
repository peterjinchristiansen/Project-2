const router = require('express').Router();
const { Quiz, Question } = require('../../models');

// GET route for /api/questions
router.get('/', (req, res) => {
    Question.findAll({
        order:[['quiz_id', 'DESC']]
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST route for /api/questions
router.post('/', (req, res) => {
    Question.create({
        prompt: req.body.prompt,
        choices: req.body.choices,
        answer: req.body.answer,
        quiz_id: req.body.quiz_id
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT route for /api/questions/:id
router.put('/:id', (req, res) => {
    Question.update({
        prompt: req.body.prompt,
        choices: req.body.choices,
        answer: req.body.answer
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbQuestionData => {
        if (!dbQuestionData) {
            res.status(404).json({ message: 'No quiz found with this id' });
            return;
        }
        res.json(dbQuestionData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// DELETE route for /api/questions/:id
router.delete('/:id', (req, res) => {
    Question.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbQuestionData => {
        if (!dbQuestionData) {
            res.status(404).json({ message: 'No question found with this id' });
            return;
        }
        res.json(dbQuestionData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;