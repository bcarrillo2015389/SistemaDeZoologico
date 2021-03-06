'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var adminRoutes = require('./routes/admin.route');
var mandatedRoutes = require('./routes/mandated.route');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configuracion de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/prueba',(req, res)=>{
    res.status(200).send({message:'PRUEBA'});
});

app.use('/admin', adminRoutes);
app.use('/mandated', mandatedRoutes);

module.exports = app;