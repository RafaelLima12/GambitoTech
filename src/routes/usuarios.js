var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    // função a ser chamada quando acessar /usuario/cadastrar
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function(req, res){
    usuarioController.autenticar(req, res);
});


router.get("/listar", function (req, res) {
    // função a ser chamada quando acessar /usuario/listar
    usuarioController.listar(req, res);
});

router.post("/atualizarRating", function(req, res){
    usuarioController.atualizarRating(req, res);
});

module.exports = router;