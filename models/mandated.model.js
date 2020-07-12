'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mandatedSchema = Schema({
    name:String,
    lastname:String,
    charge:String,
    phone:String,
    animals:[{
            name:String,
            sort:String,
            age:Number,
            scientific_name:String}
    ],
    email:String,
    password:String
});

module.exports = mongoose.model('mandated', mandatedSchema);