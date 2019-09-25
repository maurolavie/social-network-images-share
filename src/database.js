const mongoose = require('mongoose'); // Como ya esta en el archivo package.json se utiliza aca este modulo para la configuracion de la conexion a la bd

const { database } = require('./keys'); // Aca con destructuring en javaScript accedo a cierta parte del objeto y no todo. En este caso a la parte database del objeto que esta en el archivo keys


mongoose.connect(database.URI, {
    useNewUrlParser: true // Para trabajo interno de mongoose es necesario esto por ahora, tal vez en nuevas actualizaciones no sea necesario
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
    