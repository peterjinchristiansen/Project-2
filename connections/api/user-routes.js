const router = require('express').Router();
const { Quiz, Question, Users } = require('../../models');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();


// GET route for /api/user/auth/login
router.post('/auth/login', async function (req, res) {
    app.get('/', function (req, res, next) {
        req.session.user_id = dbUserData.id
        req.session.loggedIn = true;
        req.session.username = req.body.username;

        res.json(dbUserData);
    })
    
})
// GET route for /api/user/auth
router.post('/auth', async function (req, res) {
    var decryptedPassword = await bcrypt.compare(req.body.password, req.body.userHash);

    Users.findOne({
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
            id: req.params.id
        }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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