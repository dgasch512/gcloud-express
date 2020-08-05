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

// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString : process.env.DATABASE_URL,
//     ssl: true
//   }
// });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
  client: 'pg',
  connection: {
    host : 'ec2-52-200-48-116.compute-1.amazonaws.com',
    user : 'rygkfgxjgjvdxw',
    password : '62bd0cfa2f1727e7e498d6ad4334b64f21d39a71a5965ac3ca15af63bf0bed03',
    database : 'd74797jligpvgj',
    ssl: true
  }
});


const port = process.env.PORT || 4000;
const app = express();

app.set('db', db);

app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
} 


app.options('/', cors())
app.get('/', (req,res) => { res.send('it is working')})
app.post('/login', (req,res) => { login.handleLogin(req, res, db, bcrypt)});
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt)});
app.options('/blog', cors())
app.get('/blog', (req,res) => { blog.handleBlogGet(req, res, db)});
app.post('/request', (req, res) => { request.handleRequest(req, res, db)});
app.post('/artpost', (req, res) => { postart.handlePostArt(req, res, db)});
app.options('/admin', cors())
app.get('/admin', (req, res) => { admin.handleRidesGet(req, res, db)});``
app.get('/admin/:id', (req, res) => { adminId.handleAdminID(req, res, db)});
app.put('/ride-total', (req, res) => { rideTotal.rideTotal(req, res, db)});


app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})
