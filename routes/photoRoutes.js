const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');

// HOME
router.get('/', photoController.getAllPhotos);

// ADD
router.get('/add', photoController.getAddPage);
router.post('/photos', photoController.createPhoto);

// EDIT
router.get('/photos/edit/:id', photoController.getEditPage);
router.put('/photos/:id', photoController.updatePhoto);

// DELETE
router.delete('/photos/:id', photoController.deletePhoto);

// SHOW
router.get('/photos/:id', photoController.getPhoto);

module.exports = router;
