var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");


router.get("/infoGraficoLinha/:idUsuario", function (req, res) {
    dashboardController.infoGraficoLinha(req, res);
});

router.get("/buscarPontoFraco/:idUsuario", function(req, res){
    dashboardController.buscarPontoFraco(req, res);
});

router.get("/infoGraficoPizza/:idUsuario", function (req, res){
    dashboardController.infoGraficoPizza(req, res);
});


module.exports = router;