// requires express.js package and the created sequelize const from our connection.js file
require('dotenv').config();

const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./connections');
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});
const session = require('express-session');
const { Sequelize } = require('sequelize/types');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SESS_SECRET,
        cookie: {},
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
            db: sequelize
        })
};
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
app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});