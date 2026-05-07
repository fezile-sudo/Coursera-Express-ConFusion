"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Promotions = require('../models/promotions');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/').get(function (req, res, next) {
  Promotions.find({}).then(function (promotions) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotions);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).post(function (req, res, next) {
  Promotions.create(req.body).then(function (promotion) {
    console.log('Promotion Created ', promotion);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).put(function (req, res, next) {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('PUT operation not supported on /promotions');
})["delete"](function (req, res, next) {
  Promotions.remove({}).then(function (resp) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
});
promoRouter.route('/:promoId').get(function (req, res, next) {
  Promotions.findById(req.params.promoId).then(function (promotion) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).post(function (req, res, next) {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('POST operation not supported on /promotions/' + req.params.promoId);
}).put(function (req, res, next) {
  Promotions.findByIdAndUpdate(req.params.promoId, {
    $set: req.body
  }, {
    "new": true
  }).then(function (promotion) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
})["delete"](function (req, res, next) {
  Promotions.findByIdAndRemove(req.params.promoId).then(function (resp) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
});
module.exports = promoRouter;
//# sourceMappingURL=promoRouter.dev.js.map
