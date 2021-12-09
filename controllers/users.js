const { response } = require('express');
const Empleado = require('../models/Usuario');

//Metodo get para consumir en el front
const getEmpleado = async( req, res = response ) => {

    const empleados = await Empleado.find().populate('user','name email role');
    res.json({
        ok: true,
        empleados
    });
}

module.exports = {
    getEmpleado
}