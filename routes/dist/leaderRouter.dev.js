"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Leaders = require('../models/leaders');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter.route('/').get(function (req, res, next) {
  Leaders.find({}).then(function (leaders) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leaders);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).post(function (req, res, next) {
  Leaders.create(req.body).then(function (leader) {
    console.log('Leader Created ', leader);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).put(function (req, res, next) {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('PUT operation not supported on /leaders');
})["delete"](function (req, res, next) {
  Leaders.remove({}).then(function (resp) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
});
leaderRouter.route('/:leaderId').get(function (req, res, next) {
  Leaders.findById(req.params.leaderId).then(function (leader) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).post(function (req, res, next) {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('POST operation not supported on /leaders/' + req.params.leaderId);
}).put(function (req, res, next) {
  Leaders.findByIdAndUpdate(req.params.leaderId, {
    $set: req.body
  }, {
    "new": true
  }).then(function (leader) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
})["delete"](function (req, res, next) {
  Leaders.findByIdAndRemove(req.params.leaderId).then(function (resp) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
});
module.exports = leaderRouter;
//# sourceMappingURL=leaderRouter.dev.js.map
