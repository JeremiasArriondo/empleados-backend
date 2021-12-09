const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    tipo: {
        type: String,
        required: true
    },
    fechaJornada: {
        type: Date,
        required: true
    },
    turno: {
        type: String
    },
    horaDeInicio: {
        type: Date,
        required: true
    },
    horaDeFin: {
        type: Date,
        required: true
    },
    aceptado:{
        type: Boolean
    },
    user: {
        //esto hace una referencia a Usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});
//utilizo method, con el this tengo referencia a todo el objeto, con esto quiero extraer
//de manera independiente la version __v y el  _id
EventoSchema.method('toJSON', function() {
    const { __v, _id, aceptado, ...object } = this.toObject();
    //reemplazo el nombre del id por _id
    object.id = _id;
    return object;
});



module.exports = model('Evento', EventoSchema );