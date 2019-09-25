const { Image } = require('../models');

// Vamos a hacer el modulo con codigo para buscar las imagenes mas populares, estas son las que tienen mas likes
module.exports = {

    async popular() {
        const images = await Image.find()
            .limit(9)   // un limite que seria quiero las 9 imagenes mas populares no 10 ni mas...
            .sort({likes: -1});
        return images;
    }
};