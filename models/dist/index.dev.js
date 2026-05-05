"use strict";

var mongoose = require('mongoose');

var Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/conFusion';
var connect = mongoose.connect(url);
connect.then(function (db) {
  console.log('Connected correctly to server');
  var newDish = Dishes({
    name: 'Uthappizza',
    description: 'test'
  });
  newDish.save().then(function (dish) {
    console.log(dish);
    return Dishes.find({});
  }).then(function (dishes) {
    console.log(dishes);
    return Dishes.remove({});
  }).then(function () {
    return mongoose.connection.close();
  })["catch"](function (err) {
    console.log(err);
  });
});
//# sourceMappingURL=index.dev.js.map
