const moment = require('moment');

const isDate = ( value ) => {
    //Si regresa false, el campo no es correcto y va a fallar
    if ( !value ) {
        return false;
    }
    //Utilizo moment para chequear si es valida la fecha
    const fecha = moment( value );
    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }
    
}



module.exports = { isDate };