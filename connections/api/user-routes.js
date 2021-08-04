const router = require('express').Router();
const { Quiz, Question, Users } = require('../../models');
const bcrypt = require('bcrypt');

// GET route for /api/user
router.get('/', async function (req, res) {

    //TODO: add hash password lookup

    Users.findAll({
        where: {
            username: req.body.username,
        }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET route for /api/user/:id
router.get('/:id', async function (req, res) {
    Users.findOne({ 
        where: {
            username: req.params.id
        } 
    })
    .then(dbUserData => res.json(dbUserData));    
});

// POST route for /api/user
router.post('/', async function (req, res) {
    var encryptedPassword = await bcrypt.hash(req.body.password, 10);
    
    Users.create({
        username: req.body.username,
        password: encryptedPassword,
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;