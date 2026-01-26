const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const photoRoutes = require('./routes/photoRoutes');

const app = express();

///DATABASE

mongoose.connect('mongodb://localhost:27017/pcat-test-db');

//VIEW

app.set('view engine', 'ejs');

/* =======================
   MIDDLEWARES
======================= */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(fileUpload());

// ROUTES

app.use('/', photoRoutes);

// ABOUT
app.get('/about', (req, res) => {
  res.render('about');
});

//SERVER

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
