function carregarInfoPerfil() {
    var rating = sessionStorage.RATING_USUARIO;

    var rating_usuario = document.getElementById("rating_usuario");
    var nivel_usuario = document.getElementById("nivel_usuario");

    rating_usuario.innerHTML = rating;
    rating = Number(rating);
    if (rating <= 300) {
        nivel_usuario.innerHTML = "Capivara";
    } else if (rating <= 500) {
        nivel_usuario.innerHTML = "Intermediario";
    } else if (rating <= 1000) {
        nivel_usuario.innerHTML = "Avançado";
    }else if(rating <= 1600){
        nivel_usuario.innerHTML = "Competidor";
    } else if (rating <= 2200) {
        nivel_usuario.innerHTML = "Candidato a Mestre";
    } else if (rating <= 2300) {
        nivel_usuario.innerHTML = "Mestre FIDE";
    } else if (rating <= 2400) {
        nivel_usuario.innerHTML = "Mestre Internacional";
    } else {
        nivel_usuario.innerHTML = "Grande Mestre";
    }

}