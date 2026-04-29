const mysql = require("mysql2");

// CONEXÃO DO MYSQL WORKBENCH (LOCAL)
const mySqlConfig = {
  host: localhost,
  database: "exemplo_upload",
  user: "aluno",
  password: "sptech",
}

function executar(instrucao) {
  return new Promise(function (resolve, reject) {
    var conexao = mysql.createConnection(mySqlConfig);
    conexao.connect();
    conexao.query(instrucao, function (erro, resultados) {
      conexao.end();
      if (erro) {
        reject(erro);
      }
      console.log(resultados);
      resolve(resultados);
    });
    conexao.on('error', function (erro) {
      return ("ERRO NO MySQL WORKBENCH (Local): ", erro.sqlMessage);
    });
  });
}

module.exports = { executar }