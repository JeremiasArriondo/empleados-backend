//Controladores de mis rutas
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

//Establezco el valor por defecto de la resp a response
const crearUsuario = async(req, res = response ) => {
    //desestructuro desde el request del body
    const {email, password } = req.body;
    //Declaro una variable usuario y busco solamente el email del usuario
    try {
        let usuario = await Usuario.findOne({email});
        
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            });
        }

        usuario = new Usuario( req.body );

        //Encriptacion de contraseña utilizando la libreria bcrypt
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync( password, salt );
        //Una vez generada la incriptacion de contraseña, guardo al usuario

        await usuario.save();
        // Generacion del JWT

        const token = await generarJWT( usuario.id, usuario.name );

        //status 201 created
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            lastname: usuario.lastname,
            isAdmin: usuario.isAdmin,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor, contacte al administrador'
        });
    }
}

const loginUsuario = async(req, res = response ) => {

    //desestructuro desde el request del body
    const {email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({email});
        //Si el usuario no existe, mando error
        
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        };
        //Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar el JWT

        
        const token = await generarJWT( usuario.id, usuario.name ); 

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            isAdmin: usuario.isAdmin,
            token
        });          

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor, contacte al administrador'
        });
    }

}
//Funcion para revalidar token, de esta manera la sesion es mas segura
const revalidarToken = async(req, res = response ) => {
    
    const { uid, name, isAdmin, email } = req;
    const token = await generarJWT( uid, name);
    
    res.json({
        ok: true,
        uid,
        name,
        email,
        isAdmin,
        token
    });
};

const getUsuariosAuth = async(req, res = response) => {
    const usuarios = await Usuario.find().populate()

    res.json({
        ok: true,
        usuarios
    })
}
//Exportaciones 
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    getUsuariosAuth
}