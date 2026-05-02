var exercicioModel = require("../models/exercicioModel");

function buscarExercicios(req, res) {
    const rating = req.params.rating;
    const tipo = req.params.tipo;

    console.log("Tipo de exercicio: ", tipo)

    exercicioModel.buscarPorRating(rating, tipo)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            res.status(500).json(erro);
        });
}

function salvarResposta(req, res) {
    const { fkUsuario, fkExercicio, ratingUserDepois, acertou } = req.body;

    exercicioModel.registrarResposta(fkUsuario, fkExercicio, ratingUserDepois, acertou)
        .then(() => res.status(200).json({ mensagem: "Registrado" }))
        .catch(erro => res.status(500).json(erro));
}

module.exports = {
    buscarExercicios,
    salvarResposta
}