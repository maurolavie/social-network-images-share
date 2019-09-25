const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan'); // tmbn se puede encontrar como - const logger = ... en vez de const morgan = ...
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');

const routes = require('../routes/index');

module.exports = app => {
    // aqui se van a configurar los midleware, las rutas, lo necesario con express

    // Settings (el puerto del sistema operativo o el 3000)
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    // handlebars
    app.engine('.hbs', exphbs({ // handlebars es un nombre muy largo de archivo es asi que queda hbs
        defaultLayout: 'main',
        partialsDir:  path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');

    // middlewares
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image')); // Aca le dice donde ir a buscar las imagenes en el directorio public y una carpeta ahi
    app.use(express.urlencoded({extended: false}));// para poder recibir los datos que vienen desde formularios
    app.use(express.json());

    // routes
    routes(app); // a este modulo routes que viene del archivo index.js que esta en la carpeta routes le paso app

    // static files
    app.use('/public', express.static(path.join(__dirname, '../public')));
    
    // errorhandlers
    if ('development' === app.get('env')) { // si estamos en desarrollo va a manejar un error
        app.use(errorHandler);
    }
    

    return app;
}