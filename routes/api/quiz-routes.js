const router = require('express').Router();
const Quiz = require('../../models');

// Get All route for /api/quizzes
router.get('/', (req, res) => {
    Quiz.findAll({
        attributes: [
            'id',
            'title',
            'category'
        ],
        order: [['created_at', 'DESC']]
    })
        .then(dbQuizData => res.json(dbQuizData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get all of a category route for /api/quizzes/:category
router.get('/:category', (req, res) => {
    Quiz.findAll({
        where: {
            category: req.params.category
        }
    })
        .then(dbQuizData => res.json(dbQuizData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Post route for /api/quizzes
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

// Put route for /api/quizzes/:id
router.put('/:id', (req, res) => {
    if (!req.body.title && req.body.category) {
        Quiz.update(
            {
                category: req.body.category
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(dbQuizData => {
                if (!dbQuizData) {
                    res.status(404).json({ message: 'No quiz found with this id' });
                    return;
                }
                res.json(dbQuizData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } else if (req.body.title && !req.body.category) {
        Quiz.update(
            {
                title: req.body.title
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(dbQuizData => {
                if (!dbQuizData) {
                    res.status(404).json({ message: 'No quiz found with this id' });
                    return;
                }
                res.json(dbQuizData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
        Quiz.update(
            {
                title: req.body.title,
                category: req.body.category
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(dbQuizData => {
                if (!dbQuizData) {
                    res.status(404).json({ message: 'No quiz found with this id' });
                    return;
                }
                res.json(dbQuizData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

// Delete route for /api/quizzes/:id
router.delete('/:id', (req, res) => {
    Quiz.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbQuizData => {
        if (!dbQuizData) {
            res.status(404).json({ message: 'No quiz found with this id' });
            return;
        }
        res.json(dbQuizData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;