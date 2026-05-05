"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json()); // Routes for /dishes

dishRouter.route('/').get(function _callee(req, res, next) {
  var dishes;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Dishes.find({}));

        case 3:
          dishes = _context.sent;
          res.status(200).json(dishes);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}).post(function _callee2(req, res, next) {
  var dish;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Dishes.create(req.body));

        case 3:
          dish = _context2.sent;
          console.log('Dish Created', dish);
          res.status(201).json(dish); // 201 Created

          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}).put(function (req, res) {
  res.status(403).end('PUT operation not supported on /dishes');
})["delete"](function _callee3(req, res, next) {
  var resp;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Dishes.deleteMany({}));

        case 3:
          resp = _context3.sent;
          res.status(200).json(resp);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Routes for /dishes/:dishId

dishRouter.route('/:dishId').get(function _callee4(req, res, next) {
  var dish;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Dishes.findById(req.params.dishId));

        case 3:
          dish = _context4.sent;
          res.status(200).json(dish);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}).post(function (req, res) {
  res.status(403).end("POST operation not supported on /dishes/".concat(req.params.dishId));
}).put(function _callee5(req, res, next) {
  var dish;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
          }, {
            "new": true
          }));

        case 3:
          dish = _context5.sent;
          res.status(200).json(dish);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
})["delete"](function _callee6(req, res, next) {
  var resp;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Dishes.findByIdAndDelete(req.params.dishId));

        case 3:
          resp = _context6.sent;
          res.status(200).json(resp);
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = dishRouter;
//# sourceMappingURL=dishRouter.dev.js.map
