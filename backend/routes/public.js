var express = require('express');
var router = express.Router();
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// add new user onto system
router.post('/signUp', async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // if password/emailId is missing
    if (!(password && emailId)) {
      res.status(400).json({
        status: 'failure',
        reason: 'EmailId/password cannot be empty',
      });
    } else {
      // db call
      const user = await User.create({ emailId, password });
      res.status(201).json({
        status: 'success',
        id: user.id,
        emailId: user.emailId,
      });
    }
  } catch (error) {
    console.error('error occurred while signUp', error);
    res.status(500).json({
      status: 'failure',
      reason: 'Internal server error',
    });
  }
});

// login using emailId and password
router.post('/login', async (req, res) => {
  try {
    console.log('in POST /login/ =========', req.body);
    const { emailId, password } = req.body;
    // if password/emails is missing
    if (!(password && emailId)) {
      res.status(400).json({
        status: 'failure',
        reason: 'EmailId/password cannot be empty',
      });
    } else {
      let user = await User.findOne({ emailId });
      if (!user) {
        res.status(404).json({
          status: 'failure',
          reason: 'emailId not found',
        });
      }
      if (password !== user.password) {
        res.status(400).json({
          status: 'failure',
          reason: 'Invalid Credentials',
        });
      }
      // const isMatch = await bcrypt.compare(password, user.password);
      // if(!isMatch) {
      //     res.status(400).json({ msg: 'Invalid Credentials' });
      // }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, auth_token) => {
          if (err) throw err;
          res.status(201).json({ JWT: auth_token });
        }
      );
    }
  } catch (err) {
    console.error(
      'error occurred while verifying user credentials',
      err.message
    );
    res.status(500).send('Server error');
  }
});

// logout user basis auth__token
router.post('/logout', async (req, res) => {
  try {
    console.log(
      'in POST /logout/',
      req.body,
      'for user: ',
      req.user
    );
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    console.error('logout error: ', err);
    res.status(401).json({
      status: 'failure',
      reason: 'Unauthorized!',
    });
  }
});

module.exports = router;
