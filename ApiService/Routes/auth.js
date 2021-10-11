const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const config = require('../config');
const Profile = require('../Models/Profile');

// Router Export
const router = express.Router()

// Register
router.post('/register', (req, res, next) => {
    const { username, email, password, access_type, isActive } = req.body;
    const user = new User({
        username,
        email,
        password,
        access_type,
        isActive
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async (err, hash) => {
            //Hast password
            user.password = hash;
            //Save user
            try {
                const newUser = await user.save();
                const profile = new Profile({
                    firstname: user.username,
                    lastname: '',
                    birthday: '',
                    user: newUser._id
                });
                const newProfile = await profile.save();
                res.send(newProfile);
                res.end();
                next();
            }
            catch (err) {
                return next(err.message);
            }
        });
    });
});

// Login
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            const active = user.isActive;
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    if (active) {
                        // JWT Token
                        const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                            expiresIn: '1h',
                            subject: user.id
                        });
                        const { iat, exp, sub } = jwt.decode(token);
                        // API RESPONSE JWT
                        res.status(202);
                        res.send({ iat, exp, sub, token });
                        res.end();
                        next();
                    }
                    else {
                        res.status(403);
                        res.json({ "Error": { "message": "This User is currently Inactive, please contact Administration for help" } });
                        res.end();
                    }
                }
                else {
                    res.status(401);
                    res.json({ "Error": { "message":  "Password incorrect, Please verify information given is correct"} });
                    res.end();
                }
            });
        }
        else {
            res.status(404);
            res.json({ "Error": { "message": "Credentials not found" } });
            res.end();
        }

    }
    catch (err) {
        return next(err.message);
    }
});

// Refresh Token
router.post('/refresh', async (req, res, next) => {
    const { tokenWeb, user } = req.body;
    try {
        const userObj = await User.findOne({ _id: user });
        const oldToken = jwt.verify(tokenWeb, config.JWT_SECRET, { ignoreExpiration: true });
        delete oldToken.exp;
        delete oldToken.iat;
        delete oldToken.sub;

        const token = jwt.sign(userObj.toJSON(), config.JWT_SECRET, {
            expiresIn: '30m',
            subject: userObj.id
        });
        const { iat, exp, sub } = jwt.decode(token);
        // API RESPONSE JWT
        res.send({ iat, exp, sub, token });
        res.end();
        next();
    }
    catch (err) {
        return next(err.message);
    }
});

module.exports = router
