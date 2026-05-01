var database = require("../database/config");

function buscarPorRating(ratingUsuario){
    ratingUsuario = Number(ratingUsuario);
    const instrucao = `select * from exercicio where rating <= ${ratingUsuario + 150}
    and rating >= ${ratingUsuario - 500}
    order by rand()
    limit 5;`;

    return database.executar(instrucao);
}

module.exports = {
    buscarPorRating
};