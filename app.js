const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const path = require('path');

const photoRoutes = require('./routes/photoRoutes');

const app = express();

/* =======================
   DATABASE
======================= */
mongoose.connect('mongodb://localhost:27017/pcat-test-db');

/* =======================
   VIEW
======================= */
app.set('view engine', 'ejs');

/* =======================
   GLOBAL currentPage (HATA ÖNLEYİCİ)
======================= */
app.use((req, res, next) => {
  res.locals.currentPage = '';
  next();
});

/* =======================
   MIDDLEWARES
======================= */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(fileUpload());

/* =======================
   ROUTES
======================= */
app.use('/', photoRoutes);

/* =======================
   SERVER
======================= */
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
