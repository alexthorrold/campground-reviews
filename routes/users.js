const express = require('express');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.createUser));

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login',
        keepSessionInfo: true
    }), users.login);

router.get('/loginbutton', (req, res) => {
    delete req.session.returnTo;
    res.redirect('/login');
});

router.get('/logout', users.logout);

module.exports = router;