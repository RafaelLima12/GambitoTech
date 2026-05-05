var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");


router.get("/infoGraficoLinha/:idUsuario", function (req, res) {
    dashboardController.infoGraficoLinha(req, res);
});


module.exports = router;