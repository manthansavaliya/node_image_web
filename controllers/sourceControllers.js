const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Source = require('../models/source.js');

const createSource = async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        let image;

        if (req.file) {
            // File upload
            image = req.file.filename;
        } else if (imageUrl) {
            // Download image from URL and save to uploads
            const ext = path.extname(imageUrl).split('?')[ 0 ] || '.jpg';
            const filename = `${Date.now()}${ext}`;
            const filePath = path.join(__dirname, '../uploads', filename);

            const response = await axios({
                method: 'GET',
                url: imageUrl,
                responseType: 'stream'
            });

            await new Promise((resolve, reject) => {
                const stream = response.data.pipe(fs.createWriteStream(filePath));
                stream.on('finish', resolve);
                stream.on('error', reject);
            });

            image = filename;
        } else {
            return res.status(400).json({ message: 'No image file or URL provided.' });
        }

        const source = await Source.create({
            title,
            description,
            image
        });

        res.status(201).json({ message: 'Source created successfully', source });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSources = async (req, res) => {
    try {
        const sources = await Source.find();
        res.render('index', { sources });
        // res.status(200).json({ message: 'Sources fetched successfully', sources });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneSource = async (req, res) => {
    try {
        const source = await Source.findById(req.params.id);
        res.status(200).json({ message: 'Source fetched successfully', source });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSource = async (req, res) => {
    try {
        const source = await Source.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Source updated successfully', source });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSource = async (req, res) => {
    try {
        const source = await Source.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Source deleted successfully', source });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createSource, getSources, getOneSource, updateSource, deleteSource };

