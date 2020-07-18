var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectID;

// middleware
var multer = require('multer');
var upload = multer({});

router.get('/', async (req, resp) => {
    resp.render('../views/trangchu.ejs');
});

module.exports = router;