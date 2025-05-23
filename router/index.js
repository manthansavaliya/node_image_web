const express = require('express');
const router = express.Router();
const { createSource, getSources, getOneSource, updateSource, deleteSource } = require('../controllers/sourceControllers.js');
const multer = require('multer');
const Source = require('../models/source');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Home page route
router.get('/', (req, res) => {
    res.render('home');
});


// API routes
router.post('/create-source', upload.single('image'), createSource);
router.get('/sources', getSources);
router.get('/get-one-source/:id', getOneSource);
router.put('/update-source/:id', updateSource);
router.delete('/delete-source/:id', deleteSource);
router.get('/create-source', (req, res) => {
    res.render('create');
});
router.get('/create-source', (req, res) => {
    const { success } = req.query;
    res.render('create', { success });
});

router.get('/gallery', async (req, res) => {
    try {
        const sources = await Source.find().sort({ createdAt: -1 });
        res.render('gallery', { sources });
    } catch (error) {
        console.error('Error loading gallery:', error);
        res.status(500).send('Error loading gallery');
    }
});


router.get('/show-uploads', (req, res) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    fs.readdir(uploadsDir, (err, files) => {
        if (err) return res.status(500).send('Error reading uploads folder');
        res.render('show_uploads', { files });
    });
});

module.exports = router;
