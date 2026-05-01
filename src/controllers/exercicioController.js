var exercicioModel = require("../models/exercicioModel");

function buscarExercicios(req, res){
    const rating = req.params.rating;

    exercicioModel.buscarPorRating(rating)
    .then(resultado => {
        res.json(resultado);
    })
    .catch(erro =>{
        res.status(500).json(erro);
    });
}

module.exports = {
    buscarExercicios
}