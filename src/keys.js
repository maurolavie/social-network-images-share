// Aca se exporta un objeto con las propiedades necesarias para la bd
module.exports = {

    database: { // aca colocar la URI a la bd que corresponda en este caso maquina localhost y nombre de la bd imgshare
        //URI: 'mongodb://localhost/imgshare'
        URI: 'mongodb+srv://dbMauro:kdsnsjkioPlO6MXD@cluster0-oh31c.mongodb.net/test?retryWrites=true&w=majority'
    }

    // Abajo dejo comentado un ejemplo de como seria este servicio mas seguir agregandole mas servicios como por ejemplo login con facebook
    //database: { // repito todo y agrego para que se note que se le pone una coma al final del objeto etc..
    //    URI: 'mongodb://localhost/imgshare'
    //},

    //facebook: {
    //    URI:
    //    secret:
    //    et:
    //}

};
