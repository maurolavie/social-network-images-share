const express = require('express'); // Se requiere express para poder pedir router del modulo express
const router = express.Router(); // Como la app es grande va a usar la carpeta controller para funciones de guardar imagenes y otro de la pag principal

const home = require('../controllers/home');
const image = require('../controllers/image');

module.exports = app => {

    router.get('/', home.index);
    router.get('/images/:image_id', image.index); // coloca dos puntos y pide el id de alguna imagen y luego pide procesarlo con el controlador index
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like); // Aca la ruta para el controlador de manejar los likes
    router.post('/images/:image_id/comment', image.comment);
    router.delete('/images/:image_id', image.remove);

    app.use(router);
};