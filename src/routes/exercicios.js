var express = require("express");
var router = express.Router();

var exercicioController = require("../controllers/exercicioController");

router.get("/exercicios/:rating/:tipo", function (req, res) {
    exercicioController.buscarExercicios(req, res);
});

router.post("/responder", function(req, res){
    console.log("Respondendo");
    exercicioController.salvarResposta(req, res)
});

module.exports = router;