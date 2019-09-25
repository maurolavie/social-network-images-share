const mongoose = require('mongoose');
const { Schema } = mongoose; // Estos esquemas se crean por ejemplo uno para la imagen y asi...
const path = require('path');

const ImageSchema = new Schema({ // Este esquema se guardara en la bd y se puede llamar en toda la aplicacion
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

// Esto es como una variable virtual y se va a generar cuando llamemos a este modelo y no se va a encontrar en la bd
ImageSchema.virtual('uniqueId')
    .get(function () {
        return this.filename.replace(path.extname(this.filename), '')
    });

module.exports = mongoose.model('Image', ImageSchema); // Se exporta y se puede llamar en toda la aplicacion como Image y por ejemplo se lo llama desde el folder helpers y el archivo images