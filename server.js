// requires express.js package and the created sequelize const from our connection.js file
require('dotenv').config();

const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./connections');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const { ExpressHandlebars } = require('express-handlebars');
const hbs = exphbs.create({});

// assigns an instance of express to app
const app = express();
// assigns a value to PORT relative to the environment that the code is being run in, if no specific env is found sets PORT to 3001
const PORT = process.env.PORT || 3001;

// handlebars middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
    {
        secret: process.env.SESS_SECRET,
        resave: false,
        saveUninitialized: true,
    }
))

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});