const router = require('express').Router();
const Quiz = require('../../models');

// Post route for Quiz table
router.post('/', (req, res) => {
    Quiz.create({
            title: req.body.title,
            category: req.body.category
        })
        .then(dbQuizData => res.json(dbQuizData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;