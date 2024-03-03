// middleware/fileUploads.js

const multer = require('multer');
const path = require('path');
const fs = require('fs')

// Multer configuration for images and videos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Get the user ID from the request object
        const userId = req.user.id;

        // Determine the directory based on file type
        let directory;
        if (file.mimetype.startsWith('image')) {
            directory = `./uploads/images/${userId}`;
        } else if (file.mimetype.startsWith('video')) {
            directory = `./uploads/videos/${userId}`;
        } else {
            return cb({ message: 'Unsupported file type' }, false);
        }

        // Create the directory if it doesn't exist
        fs.mkdirSync(directory, { recursive: true });

        // Set the destination directory
        cb(null, directory);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
