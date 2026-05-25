let letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function carregarTabuleiro() {
    lances.innerHTML = "";
    const tabuleiro = document.getElementById("tabuleiro");
    let tabuleiroConst = ""; // Tive que criar essa variavel para armazenar os dados, pois como estou usando inner.html quando coloco <div> essa tag já e fechada autpmaticamente 


    for (let i = 8; i >= 1; i--) {
        tabuleiroConst += `<div class="linha">`
        for (let j = 1; j <= 8; j++) {
            let classe = (i + j) % 2 != 0 ? "clara" : "escura";
            let idCasa = letras[j - 1] + i;
            tabuleiroConst += `<div class="casa ${classe}" id="${idCasa}" onclick="moverPeca('${idCasa}')"></div>`;
        }
        tabuleiroConst += "</div>"
    }

    tabuleiro.innerHTML = tabuleiroConst;

    colocarPecas();
}

function colocarPecas() {

    document.getElementById('a1').innerHTML = '<img src="../assets/pecas/torre-branca.svg" alt="T" class="peca">';
    document.getElementById('b1').innerHTML = '<img src="../assets/pecas/cavalo-branco.svg" alt="C" class="peca">';
    document.getElementById('c1').innerHTML = '<img src="../assets/pecas/bispo-branco.svg" alt="B" class="peca">';
    document.getElementById('d1').innerHTML = '<img src="../assets/pecas/dama-branca.svg" alt="D" class="peca">';
    document.getElementById('e1').innerHTML = '<img src="../assets/pecas/rei-branco.svg" alt="R" class="peca">';
    document.getElementById('f1').innerHTML = '<img src="../assets/pecas/bispo-branco.svg" alt="B" class="peca">';
    document.getElementById('g1').innerHTML = '<img src="../assets/pecas/cavalo-branco.svg" alt="C" class="peca">';
    document.getElementById('h1').innerHTML = '<img src="../assets/pecas/torre-branca.svg" alt="T" class="peca">';

    document.getElementById('a8').innerHTML = '<img src="../assets/pecas/torre-preta.svg" alt="T" class="peca">';
    document.getElementById('b8').innerHTML = '<img src="../assets/pecas/cavalo-preto.svg" alt="C" class="peca">';
    document.getElementById('c8').innerHTML = '<img src="../assets/pecas/bispo-preto.svg" alt="B" class="peca">';
    document.getElementById('d8').innerHTML = '<img src="../assets/pecas/dama-preto.svg" alt="D" class="peca">';
    document.getElementById('e8').innerHTML = '<img src="../assets/pecas/rei-preto.svg" alt="R" class="peca">';
    document.getElementById('f8').innerHTML = '<img src="../assets/pecas/bispo-preto.svg" alt="B" class="peca">';
    document.getElementById('g8').innerHTML = '<img src="../assets/pecas/cavalo-preto.svg" alt="C" class="peca">';
    document.getElementById('h8').innerHTML = '<img src="../assets/pecas/torre-preta.svg" alt="T" class="peca">';


    //colocando os peões
    for (let i = 0; i < 8; i++) {
        document.getElementById(letras[i] + '2').innerHTML = '<img src="../assets/pecas/peao-branco.svg" alt="p" class="peca">'
        document.getElementById(letras[i] + '7').innerHTML = '<img src="../assets/pecas/peao-preto.svg" alt="p" class="peca">'
    }
}


let casaAntiga = "";
let notacao = "";

function moverPeca(idCasa) {
    let casaClicada = document.getElementById(idCasa);
    casaClicada.style.backgroundColor = "";

    if (casaAntiga == "") {
        if (casaClicada.innerHTML != "") {
            casaAntiga = idCasa;
            casaClicada.style.backgroundColor = "#fbff00";

            // Utilizei o querySelector para conseguir a inicial da peca que está no alt de cada imagem
            let peca = casaClicada.querySelector('img');
            peca = peca.alt

            if (peca != "p") {
                notacao += peca;
            }
        }
    } else {
        //Verificação para saber se o usuario clicou duas vezes na mesma casa
        if (idCasa === casaAntiga) {
            document.getElementById(casaAntiga).style.backgroundColor = ""; // Tira o amarelo
            casaAntiga = ""; 
            notacao = "";
            return;    
        }
        if (casaClicada.innerHTML == "") {
            console.log("Vazia")
            notacao += casaClicada.id;
        } else {
            console.log("Tem peça")

            //Verifica se a peça que está capturando é um peão
            if (notacao == "") {
                notacao += casaAntiga[0] + "x";
                console.log("lama");
            } else {
                notacao += "x";
            }
            notacao += casaClicada.id;

        }

        console.log(notacao);

        lances.innerHTML += `<div class="notacao">${notacao}</div>`;
        if (usoBot) {
            console.log("Enviei o lance para o bot");
            gerarResposta(notacao);
        } else {
            console.log("Não enviei o lance para o bot");
        }

        casaClicada.innerHTML = document.getElementById(casaAntiga).innerHTML;
        document.getElementById(casaAntiga).innerHTML = "";
        document.getElementById(casaAntiga).style.backgroundColor = "";

        //reiniciando as variaveis
        casaAntiga = "";
        notacao = "";
    }
}

function inverterTabuleiro() {
    tabuleiro.classList.toggle("invertido");
}


var usoBot = false;
function habilitarBot() {
    mensagem_bot.innerText = "";

    if (!usoBot) {
        carregarTabuleiro();
        bot_section.style.display = "flex";
        usoBot = true;

        mensagem_bot.innerText = "Olá! Eu sou o BobbyBot. Estou aqui para analisar suas partidas em tempo real. Faça seus lances no tabuleiro e eu calcularei a vantagem, apontarei os melhores movimentos e avisarei sobre possíveis erros. Vamos começar?";
    } else {
        bot_section.style.display = "none";
        usoBot = false;
    }
}

// BobbyBot
async function gerarResposta(pergunta) {
    console.log("Lance " + pergunta + " enviado")
    mensagem_bot.innerText = "Analisando...";

    const response = await fetch('http://localhost:3000/perguntar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pergunta })
    });

    const data = await response.json();

    // resposta.style.display = 'block';
    // document.getElementById('resposta').innerText = data.resultado;
    mensagem_bot.innerText = data.resultado;
}