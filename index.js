const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const path = require('path');
const knex = require('knex');

const register = require('./api/register');
const login = require('./api/login');
const blog = require('./api/blog');
const request = require('./api/request');
const postart = require('./api/postart');
const admin = require('./api/admin');
const adminId = require('./api/adminId');
const rideTotal = require('./api/rideTotal');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/', (req,res) => { res.send('it is working')})
app.post('/login', (req,res) => { login.handleLogin(req, res, db, bcrypt)});
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt)});
app.get('/blog', (req,res) => { blog.handleBlogGet(req, res, db)});
app.post('/request', (req, res) => { request.handleRequest(req, res, db)});
app.post('/artpost', (req, res) => { postart.handlePostArt(req, res, db)});
app.get('/admin', (req, res) => { admin.handleRidesGet(req, res, db)});
app.get('/admin/:id', (req, res) => { adminId.handleAdminID(req, res, db)});
app.put('/ride-total', (req, res) => { rideTotal.rideTotal(req, res, db)});


app.listen(process.env.PORT || 3000, () => {
    console.log(`App running on port: ${process.env.PORT}`)
})
