const {Schema, model } = require('mongoose');
//El esquema sencillo para el usuario
const UsuarioSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
    },
    edad: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    horasTrabajadas:{
        type: Number
    }
});

module.exports = model('Usuario', UsuarioSchema);