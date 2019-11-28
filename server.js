const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'smart_brain'
  }
});

const app = express();

/* Middlewares
------------------------------*/
app.use(bodyParser.json());

app.use(cors());
/*Routes
------------------------------*/
app.get('/', (req, res) => {
	res.send('root');
});

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, db);
});

app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
});

/*Port
------------------------------*/
app.listen(3001, () => {
	console.log('App is running on port 3001...');
});

/*API Plan:
/ --> res, It is working.
/signin --> POST, failed/success.
/register --> POST, user.
/profile/:userId --> GET, user.
/image --> 
*/