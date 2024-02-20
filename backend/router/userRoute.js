const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const { generateToken } = require('../utils/utils');
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        //Checking if the user already exists in the database
        const existUser = await User.findOne({ email })

        if (existUser) {
            return res.status(400).json({ msg: 'Email is already exist' });

        }
        const newUser = new User({ name, email, password });
        const userData = await newUser.save();
        res.status(200).json({
            user: userData
        })
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        if (user.password === password) {
            const token = generateToken(user);
            res.status(200).json({
                user,
                token
            });
        } else {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router