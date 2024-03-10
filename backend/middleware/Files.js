const express = require('express');
const auth = require('./auth');

const router = express.Router();

router.use('/api/uploads',auth, (req, res, next) => {
    const role = req.query.role;
    const fileType = req.query.fileType;
    const id = req.query.id;

    express.static(`./uploads/${fileType}/${role}/${id}`)(req, res, next);
});

module.exports = router;
