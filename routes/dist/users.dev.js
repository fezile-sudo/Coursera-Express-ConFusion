"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var User = require('../models/user');

var passport = require('passport');

var router = express.Router();
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup', function (req, res, next) {
  User.findOne({
    username: req.body.username
  }).then(function (user) {
    if (user != null) {
      var err = new Error('User ' + req.body.username + ' already exists!');
      err.status = 403;
      next(err);
    } else {
      return User.create({
        username: req.body.username,
        password: req.body.password
      });
    }
  }).then(function (user) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      status: 'Registration Successful!',
      user: user
    });
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
});
router.post('/signup', function (req, res, next) {
  User.register(new User({
    username: req.body.username
  }), req.body.password, function (err, user) {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        err: err
      });
    } else {
      passport.authenticate('local')(req, res, function () {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          success: true,
          status: 'Registration Successful!'
        });
      });
    }
  });
});
module.exports = router;
//# sourceMappingURL=users.dev.js.map
