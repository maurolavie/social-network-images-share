const express = require('express');

const config = require('./server/config');

// database
require('./database'); // al requerirlo ejecutara el codigo del archivo database.js

const app = config(express()); // Almaceno en app lo que me devuelve desde el archivo config.js que esta en la carpeta server es una manera de hacerlo, no la unica

// starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});