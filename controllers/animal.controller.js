'use strict'

var Animal = require('../models/animal.model');

function saveAnimal(req, res){
    var animal = new Animal();
    var params = req.body;

    if(params.name && params.sort && params.age && params.scientific_name){
        Animal.findOne({scientific_name:params.scientific_name},
            (err, animalFind)=>{
                if(err){
                    res.status(500).send({message:'Error general en el servidor.'});
                }else if(animalFind){
                    res.send({message:'Animal especifico ya ingresado.'});
                }else{
                    animal.name = params.name;
                    animal.sort = params.sort;
                    animal.age = params.age;
                    animal.scientific_name = params.scientific_name;

                    animal.save((err, animalSaved)=>{
                        if(err){
                            res.status(500).send({message:'Error general en el servidor.'});
                        }else if(animalSaved){
                            res.send({animal:animalSaved});
                        }else{
                            res.send({message:'Error. Animal no guardado.'});
                        }
                    });
                }
            });
    }else{
        res.send({message:'Ingrese todos los campos requeridos.'});
    }
}

function getAnimals(req, res){
    Animal.find({}).exec((err, animals)=>{
        if(err){
            res.staus(500).send({message:'Error general en el servidor.'});
        }else if(animals){
            res.send({animals:animals});
        }else{
            res.send({message:'No hay registros.'});
        }
    });
}

function searchAnimal(req, res){
    let params = req.body;

    if(params.name || params.scientific_name && params.sort){
            Animal.find({$or:[
                {name:params.name,scientific_name:params.scientific_name,
                sort:params.sort},
                {scientific_name:params.scientific_name, sort:params.sort},
                {name:params.name, sort:params.sort}
            ]} ,(err, animalFind)=>{
                    if(err){
                        res.status(500).send({message:'Error en el servidor.', err});
                    }else if(animalFind){
                        res.send({animal:animalFind});
                    }else{
                        res.send({message:'No se encontraron registros.'});
                    }
            });
    }else{
        res.send({message:'Ingrese todos los campos requeridos.'});
    }
}

module.exports = {
    saveAnimal,
    getAnimals,
    searchAnimal
};