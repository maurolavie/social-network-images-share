const { Comment, Image } = require('../models');

// Retorna el total de imagenes
async function imageCounter() {
    return await Image.countDocuments();
}

// Retorna el total de comentarios
async function commentsCounter() {
    return await Comment.countDocuments();
}

// Va a ir sumando cada una de esas propiedades de las vistas (views en el schema e un tipo Number)
async function imageTotalViewsCounter() {
    const result = await Image.aggregate([{$group: {
            _id: '1',
            viewsTotal: { $sum: '$views' } 
        }}]);
    
    return result[0].viewsTotal;
}

async function likesTotalCounter() {
    try {
        const result = await Image.aggregate([{$group: {
            _id: '1',
            likesTotal: {$sum: '$likes'}
        }}]);
        if(!result.error){
            return result[0].likesTotal;
        } else {
            throw new Error("Network response was not ok.");
        }
    } catch (error) {
        return error;
    }
}

// Aca tendremos una funcion que ejecuta a las otras funciones, todas al mismo tiempo, no importa una antes que otra ni nada de eso
// Promise.all() permite ejecutar un arreglo de funciones
// Finalmente esto se va a ejecutar en el archivo sidebar.js .... llamandolo como stats(); nada mas el nombre de este archivo ya que lo que se exporta es en si una funcion
module.exports = async () => {

    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ])

    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }

}