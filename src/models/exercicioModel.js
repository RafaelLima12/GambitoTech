const { salvarResposta } = require("../controllers/exercicioController");
var database = require("../database/config");

function buscarPorRating(ratingUsuario, tipo){
    ratingUsuario = Number(ratingUsuario);
    const instrucao = `select * from exercicio where rating <= ${ratingUsuario + 150}
    and rating >= ${ratingUsuario - 500}
    and tipo = '${tipo}'
    order by rand()
    limit 5;`;

    return database.executar(instrucao);
}

function registrarResposta(fkUsuario, fkExercicio, ratingUserDepois, acertou){
    const instrucao = `insert into exerciciosRespondidos(fkUsuario, fkExercicio, ratingUserDepois, acertou)
	values(${fkUsuario}, ${fkExercicio}, ${ratingUserDepois}, ${acertou});`;

    return database.executar(instrucao);
}

module.exports = {
    buscarPorRating,
    registrarResposta
};