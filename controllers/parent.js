var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectID;

// middleware
var multer = require('multer');
var upload = multer({});
// utils
var MyUtil = require("../utils/MyUtil.js");
const session = require('express-session');
const { validationResult } = require('express-validator');
// daos
var pathDAO = "../daos/mongoose";
var phuhuynhDAO = require(pathDAO + "/phuhuynhDAO.js");
var treemDAO = require(pathDAO + "/treemDAO.js");

router.get('/', async (req, resp) => {
    resp.render('../views/trangchu.ejs');
});

router.get('/dangnhap', async (req, resp) => {
    if (!req.session.phuhuynh) {
        resp.render('../views/dangnhap.ejs');
    } else {
        resp.redirect('/');
    }
});


router.post('/dangnhap', async (req, resp) => {
    try{
        var email = req.body.email;
        var password = req.body.password;
        // var pwdhashed = MyUtil.md5(password);
        // var phuhuynh = await phuhuynhDAO.selectByEmailAndPassword(email, pwdhashed);
        // if (phuhuynh) {
        //     console.log('abc');
        //     req.session.phuhuynh = phuhuynh;
        //     resp.redirect('/');
        // } else {
        //     MyUtil.showAlertAndRedirect(resp, 'Invalid login!', './dangnhap');
        // }
    
        var crypto = require('crypto');
        var pwdHashed = crypto.createHash('md5').update(password).digest('hex');
        //connect mongodb
        var MongoClient = require('mongodb').MongoClient;
        var uri = "mongodb+srv://admin:Ws63LIR0qnhtCPb1@cluster0.j4ajr.mongodb.net/AutismChildren";
    
        let conn = await MongoClient.connect(uri);
    
        //if(err) throw err;
        var db = conn.db('AutismChildren');
        var query = {email: email, matkhau: pwdHashed};
        let result = await db.collection('phuhuynh').findOne(query)
        
        console.log(result)
        
    
        if(result) {
            req.session.phuhuynh = result;
            console.log('logged in')
            console.log("Complete render")
            resp.redirect('/');
        } else {
            console.log('invalid');
            resp.render('dangnhap');
        }
        conn.close();
    }
    catch(err)
    {
        console.log(err)
    }
    
});



router.get('/dangxuat', (req, resp) => {
    delete req.session.phuhuynh;
    resp.redirect('/');
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

router.get('/blog', async (req, resp) => {
    resp.render('../views/blog-tre-tu-ky.ejs');
});

router.get('/nhatky', async (req, resp) => {
    if(req.session.phuhuynh)
        resp.render('../views/nhatky.ejs');
    else
        resp.render('dangnhap');
});

module.exports = router;