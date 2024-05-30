const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {isAuthenticated} = require('../middlewares/authenticate')

// Register route
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    await userService.createUser(email, password, firstName, lastName, role, []);
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

// Login route
router.get('/login', async(req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    const isMatch = await userService.comparePassword(email, password);
    if (isMatch) {
      const token = jwt.sign({ userId: user._id, email: user.email, firstName: user.firstName, role: user.role }, config.jwt, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/');
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in user');
  }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;