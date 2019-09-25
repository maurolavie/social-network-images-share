$('#post-comment').hide();
$('#btn-toggle-comment').click(e => { // Este evento es para ocultar los comentarios al dar clicken el boton post a comment
    e.preventDefault();
    $('#post-comment').slideToggle(); // Para esto oculta el blockquote que esta en image.hbs en la carpeta views y utiliza el metodo slideToggle para que se vea el formulario de poteo de comentarios
});

$('#btn-like').click(function(e) {
    e.preventDefault();
    let imgId =$(this).data('id');
    // console.log(imgId); // Para hacer pruebas y ver que sale el id con el nombre de la img que es el id con el formato jpg por consola en el navegador

    $.post('/images/' + imgId + '/like')
        .done(data => {  // Cuando termina el pedido del post... me va a dar una respuesta.. aqui va el codigo luego de teerminar el pedido que hago con lo que me responde
            console.log(data); // Por ahora con esta linea lo muestro por consola los likes cuando aprieta el boton
            $('.likes-count').text(data.likes); // .likes-count hace referencia a la vista la etiquete esa que esta en image.hbs en la carpeta views ahora si se ven los likes cuando se aprieta el boton en el front-end
        });
});

$('#btn-delete').click(function(e) {
    e.preventDefault();
    let $this = $(this); // Guardamos el elemento porque luego queremos usar algun valor como el id para eliminarlo
    const response = confirm('Are you sure you want to delete this image?');
    if (response) {
        let imgId = $this.data('id');
        // console.log(imgId); // para probar a ver si funciona en consola de el id de la imagen al dar ok en borrar
        $.ajax({ // hace peticion ajax y no peticion post porque por ajax ahora va a pedir borrar
            url: '/images/' + imgId,   // Esto va al pedido en la carpeta routes el codigo en el router.delete que se encuentra en el archivo index.js
            type: 'DELETE'
        })
        .done(function (result) {
            // console.log(result); // para prueba
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Deleted!</span>');
        });
    }
});