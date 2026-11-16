// Preencha as imagens, a dificuldade e a avaliação de cada destino aqui.
// Para adicionar uma foto: substitua "" por "imagens/nome-da-foto.jpg".
// O carrossel já tem três espaços para fotos em cada destino.
const informacoesDestinos = {
    "pedra-do-telegrafo": {
        nome: "Pedra do Telégrafo", dificuldade: "A definir", avaliacao: "Sem avaliações",
        imagens: ["", "", ""]
    },
    "mendanha": {
        nome: "Mendanha", dificuldade: "A definir", avaliacao: "Sem avaliações",
        imagens: ["", "", ""]
    },
    "praias-selvagens": {
        nome: "Praias Selvagens", dificuldade: "A definir", avaliacao: "Sem avaliações",
        imagens: ["", "", ""]
    },
    "pedra-da-tartaruga": {
        nome: "Pedra da Tartaruga", dificuldade: "A definir", avaliacao: "Sem avaliações",
        imagens: ["", "", ""]
    },
    "pico-da-pedra-branca": {
        nome: "Pico da Pedra Branca", dificuldade: "A definir", avaliacao: "Sem avaliações",
        imagens: ["", "", ""]
    },
    "pedra-do-quilombo": {
        nome: "Pedra do Quilombo", dificuldade: "A definir", avaliacao: "Sem avaliações",
        imagens: ["", "", ""]
    },
    "pedra-do-osso": {
        nome: "Pedra do Osso", dificuldade: "A definir", avaliacao: "Sem avaliações",
        imagens: ["", "", ""]
    }
};

const janelaDestino = document.getElementById("janela-destino");
const faixaDestino = document.getElementById("janela-destino-faixa");
const contadorDestino = document.getElementById("janela-destino-contador");
let indiceImagem = 0;
let totalImagens = 0;
let mapaDaJanela = null;
let pontoDaJanela = null;
let elementoQueAbriuJanela = null;

function atualizarCarrossel() {
    faixaDestino.style.transform = `translateX(-${indiceImagem * 100}%)`;
    contadorDestino.textContent = `${indiceImagem + 1} / ${totalImagens}`;
}

function mostrarImagens(destino) {
    faixaDestino.replaceChildren();
    indiceImagem = 0;
    const imagens = destino.imagens.length ? destino.imagens : [""];
    totalImagens = imagens.length;

    imagens.forEach((caminho, indice) => {
        const slide = document.createElement("div");
        slide.className = "janela-destino-slide";
        if (caminho) {
            const imagem = document.createElement("img");
            imagem.src = caminho;
            imagem.alt = `${destino.nome} - foto ${indice + 1}`;
            slide.appendChild(imagem);
        } else {
            slide.textContent = `Espaço para imagem ${indice + 1}`;
        }
        faixaDestino.appendChild(slide);
    });
    atualizarCarrossel();
}

function mudarImagem(direcao) {
    if (!totalImagens) return;
    indiceImagem = (indiceImagem + direcao + totalImagens) % totalImagens;
    atualizarCarrossel();
}

function fecharJanelaDestino() {
    janelaDestino.hidden = true;
    document.body.classList.remove("janela-destino-aberta");
    if (elementoQueAbriuJanela) elementoQueAbriuJanela.focus();
}

// Função usada pelos cards e pelos marcadores do mapa da página.
window.abrirJanelaDestino = function(id) {
    const destino = informacoesDestinos[id];
    const marcadorOriginal = window.marcadoresDeDestino?.[id];
    if (!destino || !marcadorOriginal) return;

    elementoQueAbriuJanela = document.activeElement;
    document.getElementById("janela-destino-titulo").textContent = destino.nome;
    document.getElementById("janela-destino-dificuldade").textContent = destino.dificuldade;
    document.getElementById("janela-destino-avaliacao").textContent = destino.avaliacao;
    mostrarImagens(destino);

    janelaDestino.hidden = false;
    document.body.classList.add("janela-destino-aberta");
    document.getElementById("janela-destino-fechar").focus();

    const coordenadas = marcadorOriginal.getLatLng();
    if (!mapaDaJanela) {
        mapaDaJanela = L.map("mapa-janela-destino").setView(coordenadas, 14);
        L.tileLayer('https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(mapaDaJanela);
        pontoDaJanela = L.marker(coordenadas).addTo(mapaDaJanela);
    } else {
        mapaDaJanela.setView(coordenadas, 14);
        pontoDaJanela.setLatLng(coordenadas);
    }
    requestAnimationFrame(() => mapaDaJanela.invalidateSize());
};

// Cards em destaque e em "Outros destinos".
document.querySelectorAll("#indexmain .card-destino[data-destino], #indexmain .card-outro[data-destino]")
    .forEach(card => {
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.addEventListener("click", () => window.abrirJanelaDestino(card.dataset.destino));
        card.addEventListener("keydown", evento => {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                window.abrirJanelaDestino(card.dataset.destino);
            }
        });
    });

document.getElementById("janela-destino-anterior").addEventListener("click", () => mudarImagem(-1));
document.getElementById("janela-destino-proximo").addEventListener("click", () => mudarImagem(1));
document.getElementById("janela-destino-fechar").addEventListener("click", fecharJanelaDestino);
janelaDestino.addEventListener("click", evento => {
    if (evento.target === janelaDestino) fecharJanelaDestino();
});
document.addEventListener("keydown", evento => {
    if (!janelaDestino.hidden && evento.key === "Escape") fecharJanelaDestino();
});
