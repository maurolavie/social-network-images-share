const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

// Ahora a los datos de los controladores home y de image le agregamos lo que exporte en esta funcion .. datos para estadisticas
// module.exports = async function (viewModel) { (EN LUGAR DE ESTA FUNCION DE es5 en linea de abajo una funcion flecha es lo mismo)
module.exports = async viewModel => {

    const results = await Promise.all([
        Stats(),
        Images.popular(), // aqui se obtienen las imagenes mas populares desde el modulo images en helpers y a su vez ese modulo utiliza del folder models el schema Image que es el que se guarda en la bd
        Comments.newest()
    ]);

    viewModel.sidebar = {
        stats: results[0],
        popular: results[1],
        comments: results[2]
    };

    return viewModel;
}
