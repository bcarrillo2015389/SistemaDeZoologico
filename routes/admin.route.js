'use strict'

var express = require('express');

var animalController = require('../controllers/animal.controller');
var mandatedController = require('../controllers/mandated.controller');

var api = express.Router();

api.post('/saveAnimal', animalController.saveAnimal);
api.get('/getAnimals', animalController.getAnimals);
api.post('/searchAnimal', animalController.searchAnimal);
api.post('/saveMandated', mandatedController.saveMandated);
api.get('/getMandateds', mandatedController.getMandateds);
api.post('/searchMandated', mandatedController.searchMandated);

module.exports = api;