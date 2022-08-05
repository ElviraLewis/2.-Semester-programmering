// Imports
const express = require('express');
const cors = require('cors');

// Starter og tillader .ejs
const app = express();
app.set('view engine', 'ejs');

// Giver Express serveren egenskaber.
app.use(express.json());
app.use(cors());
app.use(express.static('views'));
app.use(express.static(__dirname + '/assets'));
const PORT = 3333;

app.get('/', (req, res) => {
  res.render('index');
})

// Get request for hver side
app.get('/createProduct', (req, res) => {
  res.render('createProduct');
});

app.get('/deleteProduct', (req, res) => {
  res.render('deleteProduct');
});

app.get('/deleteUser', (req, res) => {
  res.render('deleteUser');
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/showProducts', (req, res) => {
  res.render('showProducts');
});

app.get('/updateProduct', (req, res) => {
  res.render('updateProduct');
});

app.get('/updateUser', (req, res) => {
  res.render('updateUser');
});


// Henter controllers
const userController = require('./controllers/userController');
app.use('/users', userController);

const productController = require('./controllers/productController');
app.use('/products', productController);

//Lytter på port
app.listen(PORT, () => {
  console.log(`Porto Dorito server lytter på http://localhost:${PORT}`);
});

module.exports = app;
