const router = require('express').Router();
const sequelize = require('../config/connection');
const { Quiz, Question, Users } = require('../models');

router.get('/:id', (req, res) => {
    if (req.session.loggedIn) {
        Users.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'username'
            ],
            include: [
                {
                    model: Quiz,
                    attributes: [
                        'id',
                        'title',
                        'category'
                    ]
                }
            ]
        })
            .then(dbUserData => {
                const userData = dbUserData.get({ plain: true });
                res.render('profile-page', {
                    userData,
                    user_id: req.session.user_id,
                    loggedIn: req.session.loggedIn
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    } else {
        res.render('homepage', {
            user_id: req.session.user_id,
            loggedIn: req.session.loggedIn
        });
    }
});

module.exports = router;