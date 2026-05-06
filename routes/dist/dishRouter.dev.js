"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/:dishId/comments').get(function (req, res, next) {
  Dishes.findById(req.params.dishId).then(function (dish) {
    if (dish != null) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dish.comments);
    } else {
      err = new Error('Dish ' + req.params.dishId + ' not found');
      err.status = 404;
      return next(err);
    }
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).post(function (req, res, next) {
  Dishes.findById(req.params.dishId).then(function (dish) {
    if (dish != null) {
      dish.comments.push(req.body);
      dish.save().then(function (dish) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, function (err) {
        return next(err);
      });
    } else {
      err = new Error('Dish ' + req.params.dishId + ' not found');
      err.status = 404;
      return next(err);
    }
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).put(function (req, res, next) {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes/' + req.params.dishId + '/comments');
})["delete"](function (req, res, next) {
  Dishes.findById(req.params.dishId).then(function (dish) {
    if (dish != null) {
      for (var i = dish.comments.length - 1; i >= 0; i--) {
        dish.comments.id(dish.comments[i]._id).remove();
      }

      dish.save().then(function (dish) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, function (err) {
        return next(err);
      });
    } else {
      err = new Error('Dish ' + req.params.dishId + ' not found');
      err.status = 404;
      return next(err);
    }
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
});
dishRouter.route('/:dishId/comments/:commentId').get(function (req, res, next) {
  Dishes.findById(req.params.dishId).then(function (dish) {
    if (dish != null && dish.comments.id(req.params.commentId) != null) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dish.comments.id(req.params.commentId));
    } else if (dish == null) {
      err = new Error('Dish ' + req.params.dishId + ' not found');
      err.status = 404;
      return next(err);
    } else {
      err = new Error('Comment ' + req.params.commentId + ' not found');
      err.status = 404;
      return next(err);
    }
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
}).post(function (req, res, next) {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/' + req.params.dishId + '/comments/' + req.params.commentId);
}).put(function (req, res, next) {
  Dishes.findById(req.params.dishId).then(function (dish) {
    if (dish != null && dish.comments.id(req.params.commentId) != null) {
      if (req.body.rating) {
        dish.comments.id(req.params.commentId).rating = req.body.rating;
      }

      if (req.body.comment) {
        dish.comments.id(req.params.commentId).comment = req.body.comment;
      }

      dish.save().then(function (dish) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, function (err) {
        return next(err);
      });
    } else if (dish == null) {
      err = new Error('Dish ' + req.params.dishId + ' not found');
      err.status = 404;
      return next(err);
    } else {
      err = new Error('Comment ' + req.params.commentId + ' not found');
      err.status = 404;
      return next(err);
    }
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
})["delete"](function (req, res, next) {
  Dishes.findById(req.params.dishId).then(function (dish) {
    if (dish != null && dish.comments.id(req.params.commentId) != null) {
      dish.comments.id(req.params.commentId).remove();
      dish.save().then(function (dish) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, function (err) {
        return next(err);
      });
    } else if (dish == null) {
      err = new Error('Dish ' + req.params.dishId + ' not found');
      err.status = 404;
      return next(err);
    } else {
      err = new Error('Comment ' + req.params.commentId + ' not found');
      err.status = 404;
      return next(err);
    }
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
});
module.exports = dishRouter;
//# sourceMappingURL=dishRouter.dev.js.map
