const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utilities/catchAsync')
const User = require('../models/user')
const { reviewSchema } = require('../schemas')

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async(req, res, next) => {
    try {
    const {email, username, password} = req.body
    const user = new User({ email, username })
    const registeredUser = await User.register(user, password)
    req.login(registeredUser, err => {
        if(err) return next(err)
        req.flash('success', 'Welcome to YelpCamp ⛺')
        res.redirect('/campgrounds')
    })
    } catch(e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), (req, res) => {
    req.flash('success', 'Welcome back 👋')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
})

router.get('/logout', async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye for now 🍻');
        res.redirect('/campgrounds');
    });
});


module.exports = router
