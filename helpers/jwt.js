const jwt = require('jsonwebtoken');
//Esta funcion recibe uid y name, que es lo que necesito utilizar en mi payload
const generarJWT = ( uid, name ) => {
    //Esta promesa recibe el callback que posee tanto el resolve como el reject
    return new Promise ( (resolve, reject) => {

        const payload = { uid, name };
        //Lo siguiuente es para generar el token
        //primero recibe el payload y como segundo argumento recibe una variable que debe ser unica y segura
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            //Esta seteado para que expire en 24hs esto SOLO a modo de desarrollo
            expiresIn: '24h'
        }, (err, token) => {
            //Si existe un error, envio el reject
            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }
            //Por ultimo resuelvo el token
            resolve( token );
        })
    })
}

module.exports = {
    generarJWT
}