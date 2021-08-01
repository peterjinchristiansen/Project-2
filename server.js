// requires express.js package and the created sequelize const from our connection.js file
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./connections');

// assigns an instance of express to app
const app = express();
// assigns a value to PORT relative to the environment that the code is being run in, if no specific env is found sets PORT to 3001
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});