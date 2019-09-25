const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5'); // Importa md5 para poder hacer el gravatar al guardar el email como un hash (se refiere creo a hash map)

const { Image, Comment } = require('../models');

const sidebar = require('../helpers/sidebar');

const ctrl = {};


ctrl.index = async (req, res) => {
    let viewModel = { image: {}, comments: {}};

    const image = await Image.findOne({filename: {$regex: req.params.image_id}});  // Aca consulta por una parte del id - con una exprecion regular, osea traeme la imagen que en el nombre completo tenga al menos esta parte osea que contenga esto
    if (image) { // Este if sirve para validar en el navegador que se pide una imagen con sus comentarios sino redirecciona a la pag principal
        //const image = await Image.findOne({filename: req.params.image_id}); // aca en el controlador consigo una ola imagen
        //console.log(req.params.image_id) // para probar hace prueba y ve que da en consola
        image.views = image.views + 1;
        viewModel.image = image;
        await image.save(); // Arriba incremento las veces que se ve la imagen y aqui lo salva en la bd
        //console.log(image) // Para pruebas
        const comments = await Comment.find({image_id: image._id}); // Me traigo todos los comentarios pero con image_id igual al de la imagen que encontre y veo en la vista
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel);
        res.render('image', viewModel); // render osea muestro en la vista imagen y comentarios que ahora se encuentran en la const viewModel
    } else {
        res.redirect('/');
    }
};

ctrl.create = (req, res) => {

    // El codigo sera dentro de un algoritmo recursivo para que se verifique que no se repita el nombre de la imagen tantas veces sea necesario hasta que encuentre un nombre unico sin repetir y poder almacenarlo en la bd
    const saveImage = async () => {
        const imgUrl = randomNumber(); // Aca devuelve un string con numeros aleatorios
        // Ahora un codigo para que no almacene imagenes con nombres repetidos
        const images = await Image.find({ filename: imgUrl });
        if (images.length > 0) {
            saveImage();
        } else {
            console.log(imgUrl);
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();  //Esta linea es para obtener si es .png o .jpg osea la extencion
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`) // aca mueve la imagen a esa carpeta para luego usarla en la app y le pone un nombre aleatorio para eso usa una funcion en la carpeta helpers esta

            //Ahora coloca un control para las extenciones, que formatos se quiere dar soporte
            if (ext === '.png' || ext === '.jpg' || ext === 'jpeg' || ext === '.gif') {
                await fs.rename(imageTempPath, targetPath); // este rename mueve un archivo de un directorio a otro y le pasa por parametro dir origen , dir destino
                const newImg = new Image({ // Ahora vamos a guardarlo en la bd creando un nuevo objeto Image
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                });
                const imageSaved = await newImg.save();
                // console.log(newImg) // Esto fue prara ir probando
                res.redirect('/images/' + imgUrl);
                //res.send('works'); // Esto fue prara ir probando
            } else {
                await fs.unlink(imageTempPath);
                res.status(500).json({ error: 'Only Images are allowed' });
            }
            //res.send('works!') // Esto es en tiempo de ir probandolo, luego se cambia
        }
    };

    saveImage();

};

// Controlador para incrementar los likes en las fotos
ctrl.like = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}})
    if (image) {
        image.likes = image.likes + 1;
        await image.save();
        res.json({likes : image.likes});
    } else {
        res.status(500).json({error: 'Internal Error'});
    }
};

// Controlador para los comentarios debajo de las fotos
ctrl.comment = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if (image) {
        const newComment = new Comment(req.body); // Ahora le indico voy a crear un nuevo modelo de comentario en la bd que va a utilizar los datos de req.body
        newComment.gravatar = md5(newComment.email); // El correo sera transformado a un hash (un texto cifrado) y sera asignado al objeto
        newComment.image_id = image._id;
        await newComment.save(); // Lo guardo en la bd
        res.redirect('/images/' + image.uniqueId);
        //res.send('comment'); // codigo pra ir probando si funciona el controlador
    } else {
        res.redirect('/');
    }
    //console.log(req.body); // codigo pra ir probando si funciona el controlador
    //console.log(newComment); codigo pra ir probando si funciona el controlador
    //console.log(req.params.image_id) codigo pra ir probando si funciona el controlador
};

// Controlador para eliminar la imagen
ctrl.remove = async (req, res) => {
    // console.log(req.params.image_id) // Esto para probar y ver que al aprepar en la pag el boton delete, en la terminal aparece el id de la imagen
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    // Primero ve si la encontro y se es asi la va a remover de la carpeta upload
    if (image) {
        await fs.unlink(path.resolve('./src/public/upload/' + image.filename)); // aca remueve la imagen
        await Comment.deleteOne({image_id: image._id}); // Aca elimina el comentario con el id de la imagen
        await image.remove(); // Aca elimino el mismo dato osea la imagen en si
        res.json(true);
    }
};

module.exports = ctrl;