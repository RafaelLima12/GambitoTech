var express = require("express");
var router = express.Router();

var exercicioController = require("../controllers/exercicioController");

router.get("/exercicios/:rating", function (req, res) {
    exercicioController.buscarExercicios(req, res);
});

module.exports = router;