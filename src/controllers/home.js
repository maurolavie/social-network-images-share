const ctrl = {};

const { Image } = require('../models'); // va a obtener las imágenes desde el modelo

const sidebar = require('../helpers/sidebar');

ctrl.index = async (req, res) => {
    const images = await Image.find().sort({timestamp: -1});  // Para ordenarlo de manera ascendente timestamp: 1 y para descendente timestamp: -1
    let viewModel = {images: []};
    viewModel.images = images;
    viewModel = await sidebar(viewModel); // Retorna el mismo viewModel y se guarda en el mismo pero con mas datos
    // console.log(viewModel); // Probe y salio todo por la terminal en la consola
    res.render('index', viewModel); // En lugat de las imagene le pasa el viewModel (abajo la linea anterior)
    //res.render('index', {images}); // Ahora le pasamos las imagenes obtenidas desde la bd a la vista. Esto con lo que se agrega despues de la coma (, {images: images}) o simplemente ( ,{images})
};                      // Ahora en el index de la carpeta views osea de la vista puedo usar esta variable {images}

module.exports = ctrl;