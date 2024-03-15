const express = require('express');
const User = require('../model/User.Model');
const { generateToken } = require('../utils/authService');

const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password ) {
            return res.status(403).json({ msg: 'All fields are required' });
        }
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ msg: 'User is already exist' });
        }
        const newUser = new User({ username, email, password, role });
        const token = generateToken(newUser);
        const newUserData = await newUser.save();
        res.status(200).json({
            message: 'User registered successfully',
            user: newUserData,
            token
        })
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}
const login = async (req, res) => {
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
}
const profile = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId);
        console.log(user);

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}
const logout = async (req, res) => {
    try {
        res.status(200).json({ msg: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { signup, login, profile, logout }