const path = require('path');
const fs = require('fs');
const Photo = require('../models/Photo');

//LIST (HOME)
exports.getAllPhotos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 3;
  const skip = (page - 1) * limit;

  const totalPhotos = await Photo.countDocuments();

  const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip(skip)
    .limit(limit);

  res.render('index', {
    photos,
    current: page,
    pages: Math.ceil(totalPhotos / limit),
    currentPage: 'home', // ✅ DÜZELTİLDİ
  });
};

//ADD PAGE
exports.getAddPage = (req, res) => {
  res.render('add', {
    currentPage: 'add', // ✅ DÜZELTİLDİ
  });
};

//CREATE
exports.createPhoto = async (req, res) => {
  const uploadDir = path.join(__dirname, '../public/uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const uploadedImage = req.files.image;
  const uploadPath = path.join(uploadDir, uploadedImage.name);

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
};

//EDIT PAGE
exports.getEditPage = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('edit', {
    photo,
    currentPage: 'photo',
  });
};

//UPDATE
exports.updatePhoto = async (req, res) => {
  await Photo.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/photos/' + req.params.id);
};

// DELETE
exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);

  const filePath = path.join(__dirname, '../public', photo.image);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
};

//SHOW (DETAIL)
exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
    currentPage: 'photo',
  });
};

//ABOUT
// ABOUT PAGE
exports.getAboutPage = (req, res) => {
  res.render('about', {
    currentPage: 'about',
  });
};
