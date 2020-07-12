'use strict'

var Mandated = require('../models/mandated.model');
var Animal = require('../models/animal.model');

function login(req, res) {
    var params = req.body;

    if (params.email && params.password) {
        Mandated.findOne({
            email: params.email,
            password: params.password
        }, (err, user) => {
            if (err) {
                res.status(500).send({
                    message: 'Error general del servidor'
                });
            } else if (user) {
                res.send({
                    user: user
                });
            } else {
                res.status(404).send({
                    message: 'ERROR. El correo electrónico o la contraseña son incorrectos.'
                });
            }
        });
    } else {
        res.status(200).send({
            message: 'Ingrese todos los campos requeridos.'
        });
    }
}

function getMandateds(req, res) {
    Mandated.find({}).exec((err, mandateds) => {
        if (err) {
            res.staus(500).send({
                message: 'Error general en el servidor.'
            });
        } else if (mandateds) {
            res.send({
                mandateds: mandateds
            });
        } else {
            res.send({
                message: 'No hay registros.'
            });
        }
    });
}

function saveMandated(req, res) {
    var mandated = new Mandated();
    var params = req.body;
    var animal;
    var mandatedExist = true;
    var id;

    if (params.name && params.lastname && params.charge && params.phone && params.animal && params.email && params.password) {

        Animal.findOne({name:params.animal},(err, animalFind)=>{
            if(err){
                res.status().send({message:'Error general en el servidor.'});
            }else if(animalFind){

                mandated.name = params.name;
                mandated.lastname = params.lastname;
                mandated.charge = params.charge;
                mandated.phone = params.phone;
                mandated.email = params.email;
                mandated.password = params.password;
                mandated.animals = animalFind;

                mandated.save((err, mandatedSaved) => {
                    if (err) {
                        res.status(500).send({message: 'Error general en el servidor'});

                    } else if (mandatedSaved) {
                        res.send({mandatedSaved});
                    } else {
                        res.send({
                            message: 'Error. Encargado no guardado.'
                        });
                    }
                });
            }else{
                res.send({message:'El animal ingresado no se encuantra registrado.'});
            }
        });
    } else {
        res.send({
            message: 'Ingrese los campos necesarios.'
        });
    }
}

function searchMandated(req, res){
    let params = req.body;

    if(params.name && params.lastname || params.charge){
            Mandated.find({$or:[
                {name:params.name, lastname:params.lastname, charge:params.charge},
                {charge:params.charge},
                {name:params.name, lastname:params.lastname}
            ]} ,(err, mandatedFind)=>{
                    if(err){
                        res.status(500).send({message:'Error en el servidor.'});
                    }else if(mandatedFind){
                        res.send({mandated:mandatedFind});
                    }else{
                        res.send({message:'No se encontraron registros.'});
                    }
            });
    }else{
        res.send({message:'Ingrese todos los campos requeridos.'});
    }
}

module.exports = {
    saveMandated,
    login,
    getMandateds,
    searchMandated
};