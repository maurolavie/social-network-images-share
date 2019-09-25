const { Comment, Image } = require('../models');

module.exports = {

    // La idea es encontrar los comentarios mas novedosos. Primero con find() los encuentra a todos, luego da un limite los 5 mas novedosos
    // luego los ordena por timestamp -1 para que sea de los mas novedosos a los menos novedosos
    // la const comments contendra luego de la busqueda un arreglo de comentarios, los vamos a recorrer
    // para asociarlos a una imagen que le corresponda por eso se requiere Image del modelo y se la pondra en miniatura
    async newest() {
        const comments = await Comment.find()
            .limit(5)
            .sort({timestamp: -1});

        for (const comment of comments) {
            const image = await Image.findOne({_id: comment.image_id}) // aca busca desde el modelo de Image y trae la imagen del comentario por el image_id, Osea obtenemos la imagen a la que pertenece ese comentario
            comment.image = image; // Aca esa imagen se la asignamos a ese comentario
        }

        return comments;
    }

};