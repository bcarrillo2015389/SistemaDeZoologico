'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var animalSchema = Schema({
    name:String,
    sort:String,
    age:Number,
    scientific_name:String
});

module.exports = mongoose.model('animal', animalSchema);