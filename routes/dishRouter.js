const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// Routes for /dishes
dishRouter.route('/')
.get(async (req, res, next) => {
    try {
        const dishes = await Dishes.find({});
        res.status(200).json(dishes);
    } catch (err) {
        next(err);
    }
})
.post(async (req, res, next) => {
    try {
        const dish = await Dishes.create(req.body);
        console.log('Dish Created', dish);
        res.status(201).json(dish); // 201 Created
    } catch (err) {
        next(err);
    }
})
.put((req, res) => {
    res.status(403).end('PUT operation not supported on /dishes');
})
.delete(async (req, res, next) => {
    try {
        const resp = await Dishes.deleteMany({});
        res.status(200).json(resp);
    } catch (err) {
        next(err);
    }
});

// Routes for /dishes/:dishId
dishRouter.route('/:dishId')
.get(async (req, res, next) => {
    try {
        const dish = await Dishes.findById(req.params.dishId);
        res.status(200).json(dish);
    } catch (err) {
        next(err);
    }
})
.post((req, res) => {
    res.status(403).end(`POST operation not supported on /dishes/${req.params.dishId}`);
})
.put(async (req, res, next) => {
    try {
        const dish = await Dishes.findByIdAndUpdate(
            req.params.dishId,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(dish);
    } catch (err) {
        next(err);
    }
})
.delete(async (req, res, next) => {
    try {
        const resp = await Dishes.findByIdAndDelete(req.params.dishId);
        res.status(200).json(resp);
    } catch (err) {
        next(err);
    }
});

module.exports = dishRouter;
