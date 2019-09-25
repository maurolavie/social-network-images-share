// Este helpers es para handlevars (funciones que voy a utilizar en mi vista) no como la otra carpeta que es para archivos del servidor algo asi
const moment = require('moment');
const helpers = {};

// La funcion me va a devolver del tiempo timestamp que ha pasado me devuelve en minutos cuanto tiempo paso por ejemplo hace un minuto
helpers.timeago = timestamp => {
    return moment(timestamp).startOf('minute').fromNow();
};

module.exports = helpers;
