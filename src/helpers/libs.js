const helpers = {};

helpers.randomNumber = () => {
    const possible = 'abcdefghijklmnñopqrstuvwxyz0123456789'; // poner los caracteres que quiera para que los use para crear el nombre aleatorio de la imagen
    let randomNumber = 0; // let y no const porque estara cambiando su valor asi que no es constante
    for (let i = 0; i < 6; i++) {
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length)) //con esta funcion math.floor redondea hacia abajo para que me quede nro entero y no decimal despues de obtener con math.random uno aleatorio y possible.lenght para tener un nro que no sea mas largo que la longitud de la variable possible
    }
    return randomNumber;
};

module.exports = helpers;