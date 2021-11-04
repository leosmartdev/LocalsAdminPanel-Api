const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const jwt = require('jsonwebtoken');
const countries = require('i18n-iso-countries');

exports.signup = asyncHandler(async (req, res, next) => {
  // const ipinfo = await fetch(`https://ipinfo.io/?token=${process.env.IP_INFO_TOKEN}`);
  // const geo = await ipinfo.json();
  // const country = countries.getName(geo.country, 'en', { select: 'official' });

  const user = new User(req.body);
  await user.save();

  const accessToken = jwt.sign({ user }, 'secret');

  res.json({
    success: true,
    message: 'signup successfull',
    accessToken: accessToken,
    user
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username: username });

  if (!user) return res.json({ success: false, message: 'Username is not exist.' });

  if (user.password !== password) {
    return res.json({
      success: false,
      message: 'Incorrect username or password.'
    });
  }

  const accessToken = jwt.sign({ user }, 'secret', { expiresIn: '365d' });

  res.json({
    success: true,
    message: 'login successfull',
    accessToken,
    user
  });
});

exports.adminlogin = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email, password, role: 'admin' });
  if (!user) return res.json({ success: false, message: 'There is no user corresponding to the email address.' }).status(400);

  if(user.password !== password){
    return res.json({ success: false, message: 'Wrong password' }).status(400);
  }

  const accessToken = jwt.sign({ user }, 'secret', { expiresIn: '365d' });

  res.json({
    success: true,
    message: 'login successfull',
    accessToken,
    user
  });
});

exports.myAccount = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.json({
    success: true,
    user
  });
});
