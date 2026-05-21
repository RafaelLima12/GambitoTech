var database = require("../database/config");


function infoGraficoLinha(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function infoGraficoLinha(): ", idUsuario)
    var instrucaoSql = `
        select ratingUserDepois, date_format(dataRegistro, '%d/%m/%Y') dataRegistro from exerciciosRespondidos where fkUsuario = ${idUsuario} order by id desc limit 20;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function infoGraficoPizza(idUsuario) {
    /*Estou usando uma subquery para pegar a data do maior rating.
    Para isso to dando um select na mesma tabela ordenando pelo rating mais alto
    e limitando para trazer apenas um valor (se não tiver o limit da erro)*/
    var instrucaoSql = `
        select 
        sum(case when acertou > 0 then 1 else 0 end) acertos, 
        sum(case when acertou < 1 then 1 else 0 end) erros,
        max(ratingUserDepois) maior_rating,
        (select date_format(dataRegistro, '%d/%m/%Y') 
        from exerciciosRespondidos where fkUsuario = ${idUsuario} 
        order by ratingUserDepois desc limit 1)data_maior_rating 
        from exerciciosRespondidos
        where fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPontoFraco(idUsuario) {
    var instrucaoSql = `
        select te.tipo,
        truncate(sum(er.acertou) / count(*) * 100, 2) proporcao_resposta_acerto
        from exerciciosRespondidos er
        join exercicio ex
        on er.fkExercicio = ex.id
        join tipoExercicio te
        on te.id = ex.fkTipo
        where fkUsuario = ${idUsuario}
        group by fkTipo
        order by proporcao_resposta_acerto asc
        limit 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRanking(){
    var instrucaoSql =`
        select id, nome, rating from usuario
        order by rating desc;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    infoGraficoLinha,
    infoGraficoPizza,
    buscarPontoFraco,
    buscarRanking
};