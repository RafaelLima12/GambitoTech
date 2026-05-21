var ratingMaisAlto = 300;
var idUser = sessionStorage.ID_USUARIO;

function carregar_infos() {
    carregarInfoPerfil();
    carregarGraficos();
    pontoFraco();
    carregarRanking();
}

function carregarGraficos() {

    fetch(`/dashboard/infoGraficoLinha/${idUser}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGraficoLinha(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    fetch(`/dashboard/infoGraficoPizza/${idUser}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGraficoPizza(resposta);
                kpiInfo(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });


}


function carregarRanking() {
    fetch('/dashboard/ranking').then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                mostrarRanking(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}



function plotarGraficoPizza(dados) {
    const pizza = document.getElementById('graficoPizza');

    let graficoPizza = new Chart(pizza, {
        type: 'pie',
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                label: 'Acertos e erros',
                data: [],
                backgroundColor: [
                    '#739e45', // Define a cor dos acertos
                    '#a93226'  // Define a cor dos erros
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    graficoPizza.data.datasets[0].data.push(dados[0].acertos);
    graficoPizza.data.datasets[0].data.push(dados[0].erros);


    graficoPizza.update();
}


function plotarGraficoLinha(dados) {
    let ctx = document.getElementById('graficoLinha');
    let labels = [];

    let graficoLinha = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Rating',
                data: [],

                borderColor: '#739e45',      // cor da linha
                backgroundColor: '#739e4533', // cor do preenchimento (transparente)
                borderWidth: 2,
                tension: 0.4,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    for (i = dados.length - 1; i >= 0; i--) {
        var registro = dados[i];
        graficoLinha.data.labels.push(registro.dataRegistro);
        graficoLinha.data.datasets[0].data.push(registro.ratingUserDepois);
    }

    graficoLinha.update();
}

function pontoFraco() {
    fetch(`/dashboard/buscarPontoFraco/${idUser}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                ponto_fraco_kpi.innerHTML = resposta[0].tipo;
                proporcao_acerto.innerHTML = `Taxa de acertos: ${resposta[0].proporcao_resposta_acerto}%`;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


function kpiInfo(resposta) {
    let niveis = [300, 500, 1000, 1600, 2200, 2300, 2400, 2500];
    ratingMaisAlto = resposta[0].maior_rating;
    rating_mais_alto.innerText = ratingMaisAlto;
    dt_rating_mais_alto.innerText = resposta[0].data_maior_rating;

    if (ratingMaisAlto > sessionStorage.RATING_USUARIO) {
        diferenca_rating.innerText = `↓${ratingMaisAlto - sessionStorage.RATING_USUARIO}`;
        diferenca_rating.style.color = "#c0392b";
    } else {
        diferenca_rating.innerText = "";
    }

    if (sessionStorage.RATING_USUARIO >= 2500) {
        prx_nivel_txt.innerText = `Nível máximo atingido!!! PARABÉNS`;
        prx_nivel_txt.style.color = "#739e45";
    } else {
        for (let i = 0; i < niveis.length; i++) {
            if (sessionStorage.RATING_USUARIO < niveis[i]) {
                prx_nivel_txt.innerText = `+${(niveis[i] - sessionStorage.RATING_USUARIO)} pontos para o próximo nível`;
                prx_nivel_txt.style.color = "#739e45";
                break;
            }
        }
    }
}

function mostrarRanking(resposta) {
    console.log(resposta);

    for (let i = 0; i < resposta.length; i++) {
        let podio = "";
        let player = "";
        if (i == 0) {
            podio = "primeiro_lugar";
        } else if (i == 1) {
            podio = "segundo_lugar";
        } else if (i == 2) {
            podio = "terceiro_lugar"
        }

        if (sessionStorage.ID_USUARIO == resposta[i].id) player = "player_ranking";

        ranking_players.innerHTML += `
                    <div class="elemento_ranking ${podio} ${player}">
                        <span>${resposta[i].nome}</span>

                        <div class="rating_nivel">
                            <span>Rating</span>
                            -
                            <span>${resposta[i].rating}</span>
                        </div>
                    </div>`;
    }
}

function plotarRanking() {
    document.getElementById("dashboard_section").style.display = "none";
    ranking_section.style.display = "flex";
}

function mostrarDash() {
    document.getElementById("dashboard_section").style.display = "flex";
    ranking_section.style.display = "none";
}