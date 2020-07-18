var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectID;

// middleware
var multer = require('multer');
var upload = multer({});

router.get('/', async (req, resp) => {
    resp.render('../views/trangchu.ejs');
});

router.get('/dangnhap', async (req, resp) => {
    resp.render('../views/dangnhap.ejs');
});

router.get('/dangky', async (req, resp) => {
    resp.render('../views/dangky.ejs');
});

router.get('/baigiang', async (req, resp) => {
    resp.render('../views/baigiang.ejs');
});

router.get('/gioithieu', async (req, resp) => {
    resp.render('../views/gioithieu.ejs');
});

router.get('/lamkiemtra', async (req, resp) => {
    resp.render('../views/lamkiemtra.ejs');
});

router.get('/lienhe', async (req, resp) => {
    resp.render('../views/lienhe.ejs');
});

router.get('/themhosotre', async (req, resp) => {
    resp.render('../views/themhosotre.ejs');
});

router.get('/thuvien', async (req, resp) => {
    resp.render('../views/thuvien.ejs');
});

module.exports = router;