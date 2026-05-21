var dashboardModel = require("../models/dashboardModel");



function infoGraficoLinha(req, res) {
    var idUsuario = req.params.idUsuario;
    dashboardModel.infoGraficoLinha(idUsuario).then(function (resultado) {
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function infoGraficoPizza(req, res) {
    var idUsuario = req.params.idUsuario;
    dashboardModel.infoGraficoPizza(idUsuario).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarPontoFraco(req, res) {
    var idUsuario = req.params.idUsuario;
    dashboardModel.buscarPontoFraco(idUsuario).then(function (resultado) {
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarRanking(req, res){
    dashboardModel.buscarRanking().then(function (resultado){
        res.status(200).json(resultado)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    });
}



module.exports = {
    infoGraficoLinha,
    infoGraficoPizza,
    buscarPontoFraco,
    buscarRanking
}