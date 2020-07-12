'use strict'

var express = require('express');

var mandatedController = require('../controllers/mandated.controller');

var api = express.Router();

api.post('/login', mandatedController.login);

module.exports = api;