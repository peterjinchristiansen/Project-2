// Dependencies
// =============================================================
const mysql = require('mysql');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const app = express();
const PORT = process.env.PORT || 3001;

var LocalStrategy = require('passport-local').Strategy;
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
})

connection.query('USE users_db');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/success', (req, res) => {
  res.render('success');
})

app.get('/:num', (req, res) => {
  return;
});

app.post('/register', async function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  var insertQuery = "INSERT INTO users ( username, password ) values ('" + req.body.username + "','" + encryptedPassword + "')";
  console.log(insertQuery);
  connection.query(insertQuery);
  res.render('success');
});

app.post('/login', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const data = {
    message: '',
    success: false,
  }

  connection.query('SELECT * FROM users WHERE username = ?', [username], async function (err, rows, fields) {
    console.log(rows);
    if (rows.length > 0) {
      const comparsion = await bcrypt.compare(password, rows[0].password);
      console.log('comparsion: ' + comparsion);

      if (comparsion) {
        data.success = true;
        data.message = 'login successful';
      } else {
        data.message = 'incorrect password';
      }
    } else {
      data.message = 'user not found';
    }
    res.render('login', data);
  });
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});