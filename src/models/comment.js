const { Schema, model } = require('mongoose');
const ObjectId = Schema.ObjectId;
// const { ObjectId } = Schema; // Asi o lo mismo el de arriba

const CommentSchema = new Schema({
    image_id: { type: ObjectId }, // Aca le digo que el id viene de una coleccion y mongoose ya lo sabe
    email: { type: String },
    name: { type: String },
    gravatar: { type: String },
    comment: { type: String },
    timestamp: { type: Date, default: Date.now }
});

CommentSchema.virtual('image')  // Esta es una propiedad virtual que no se guarda en la bd y que necesito.. lo creo desde otra propiedad del schema de arriba
    .set(function (image) {     // La tengo que crear porque necesito anexar la imagen al comentario
        this._image = image;
    })
    .get(function () {
        return this._image;
    });

module.exports = model('Comment', CommentSchema);