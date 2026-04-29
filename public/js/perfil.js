function carregarInfoPerfil() {
    var rating = sessionStorage.RATING_USUARIO;

    var rating_usuario = document.getElementById("rating_usuario");
    var nivel_usuario = document.getElementById("nivel_usuario");

    rating_usuario.innerHTML = rating;
    rating = Number(rating);
    if (rating >= 300) {
        nivel_usuario.innerHTML = "Capivara";
    }

}