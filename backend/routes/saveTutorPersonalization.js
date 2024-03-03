const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const multer = require('multer');
const path = require('path');

// Multer configuration for images
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images');
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const imageUpload = multer({ storage: imageStorage });

// Multer configuration for videos
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/videos');
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const videoUpload = multer({ storage: videoStorage });

router.post('/personalization', auth, roleCheck(["Tutor"]), imageUpload.fields([{ name: 'pfp', maxCount: 1 }]), videoUpload.fields([{ name: 'introductionVideo', maxCount: 1 }]), (req, res) => {
    const {
        country,
        Description,
        TeachingStyle,
        AboutMe,
        Languages,
        workExperience,
        Education,
    } = req.body;
    const id = req.user.id;

    const pfpFileName = req.files['pfp'][0].filename;
    const introductionVideoFileName = req.files['introductionVideo'][0].filename;

    console.log(pfpFileName, introductionVideoFileName);
    // Update the tutor information with the filenames
    const query = 'UPDATE tutor SET Country = ?, pfp = ?, introductionVideo = ?, description = ?, teachingStyle = ?, AboutMe = ?, Languages = ?, WorkExperience = ?, education = ? WHERE id = ?';
    /*mysql.query(query, [country, pfpFileName, introductionVideoFileName, Description, TeachingStyle, AboutMe, Languages, workExperience, Education, id], (err, result) => {
        if (err) {
            console.error('Error updating tutor:', err);
            res.status(500).json({ error: 'Error updating tutor' });
        } else {
            console.log('Tutor updated successfully');
            res.status(200).json({ message: 'Tutor updated successfully' });
        }
    });*/
});

module.exports = router;
