
"use strict";

// ==========================================
// PRIME RESIDENCE - JAVASCRIPT
// ==========================================

// 1. FILTROS DE IMÓVEIS

const botoesFiltro = document.querySelectorAll(".filtro-btn");
const imoveis = document.querySelectorAll(".imovel-card");
const filtroPreco = document.getElementById("preco-maximo");

let categoriaSelecionada = "todos";

// Função principal dos filtros
function filtrarImoveis() {

    const precoSelecionado = filtroPreco.value;

    let quantidadeEncontrada = 0;

    imoveis.forEach(function(imovel) {

        const tipo = imovel.dataset.tipo;

        const textoPreco = imovel.querySelector(
            ".imovel-info strong"
        ).textContent;

        const preco = Number(
            textoPreco.replace(/[^\d]/g, "")
        );

        const categoriaCorreta =
            categoriaSelecionada === "todos" ||
            categoriaSelecionada === tipo;

        const precoCorreto =
            precoSelecionado === "todos" ||
            preco <= Number(precoSelecionado);

        const mostrarImovel = categoriaCorreta && precoCorreto;

        imovel.classList.toggle("oculto", !mostrarImovel);

        if (mostrarImovel) {
            quantidadeEncontrada++;
        }

    });

    // Exibe a mensagem quando nenhum imóvel for encontrado
    const mensagem = document.getElementById("sem-resultados");

    mensagem.hidden = quantidadeEncontrada > 0;

// Atualiza o contador de imóveis encontrados
const contador = document.getElementById("contador-imoveis");

if (contador) {
    contador.textContent =
        quantidadeEncontrada === 1
            ? "1 imóvel encontrado"
            : quantidadeEncontrada + " imóveis encontrados";
}

}


// Filtro por categoria
botoesFiltro.forEach(function(botao) {

    botao.addEventListener("click", function() {

        categoriaSelecionada = botao.dataset.filtro;

        botoesFiltro.forEach(function(item) {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        filtrarImoveis();

    });

});

// Filtro por preço
if (filtroPreco) {

    filtroPreco.addEventListener("change", function() {
        filtrarImoveis();
    });

    filtrarImoveis();

}


// ==========================================
// 2. MODAL DE DETALHES
// ==========================================

const modal = document.getElementById("modal-imovel");
const fecharModal = document.getElementById("fechar-modal");
const botoesDetalhes = document.querySelectorAll(".btn-detalhes");

let ultimoBotaoClicado = null;

// Abre o modal com os dados do imóvel
function abrirModal(card, botao) {

    const imagem = card.querySelector("img");
    const tipo = card.querySelector(".imovel-tipo");
    const titulo = card.querySelector("h3");
    const localizacao = card.querySelector(".imovel-info p");
    const caracteristicas = card.querySelector(".imovel-detalhes");
    const preco = card.querySelector(".imovel-info strong"); 
    const descricao = card.querySelector(".descricao-imovel");
    const modalImagem = document.getElementById("modal-imagem");

    modalImagem.src = imagem.src;
    modalImagem.alt = imagem.alt;

    document.getElementById("modal-tipo").textContent =
        tipo.textContent.trim();

    document.getElementById("modal-titulo").textContent =
        titulo.textContent.trim();

    document.getElementById("modal-localizacao").textContent =
        localizacao.textContent.trim();

    document.getElementById("modal-caracteristicas").textContent =
        caracteristicas.innerText.replace(/\s+/g, " ").trim();

    document.getElementById("modal-preco").textContent =
        preco.textContent.trim();
        
// Exibe a descrição do imóvel selecionado
document.getElementById("modal-descricao").textContent =
    descricao.textContent.trim();


    ultimoBotaoClicado = botao;

    modal.hidden = false;
    document.body.style.overflow = "hidden";

    fecharModal.focus();

}

// Programa os botões "Ver Detalhes"
botoesDetalhes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const card = botao.closest(".imovel-card");

        abrirModal(card, botao);

    });

});

// Fecha o modal
function fecharJanela() {

    modal.hidden = true;

    document.body.style.overflow = "";

    if (ultimoBotaoClicado) {
        ultimoBotaoClicado.focus();
    }

}

// Fecha pelo X
fecharModal.addEventListener("click", fecharJanela);

// Fecha clicando no fundo escuro
modal.addEventListener("click", function(evento) {

    if (evento.target === modal) {
        fecharJanela();
    }

});

// Fecha pressionando ESC
document.addEventListener("keydown", function(evento) {

    if (evento.key === "Escape" && !modal.hidden) {
        fecharJanela();
    }

    // Mantém o foco dentro da janela aberta
    if (evento.key === "Tab" && !modal.hidden) {
        evento.preventDefault();
        fecharModal.focus();
    }

});


// ==========================================
// 3. BOTÃO DE CONTATO
// ==========================================

const botaoContato = document.getElementById("btn-contato");

if (botaoContato) {

    botaoContato.addEventListener("click", function() {

        alert(
            "🏡 PRIME RESIDENCE\n\n" +
            "Este é um projeto demonstrativo de imobiliária premium.\n\n" +
            "Nenhum atendimento ou negociação real será realizado."
        );

    });

}

// ==========================================
// BOTÃO LIMPAR FILTROS
// ==========================================

const botaoLimpar = document.getElementById("limpar-filtros");

botaoLimpar.addEventListener("click", function() {

    // Volta para a categoria Todos
    categoriaSelecionada = "todos";

    // Remove o destaque dos botões
    botoesFiltro.forEach(function(botao) {
        botao.classList.remove("ativo");
    });

    // Destaca o botão Todos
    const botaoTodos = document.querySelector(
        '.filtro-btn[data-filtro="todos"]'
    );

    botaoTodos.classList.add("ativo");

    // Restaura o preço padrão
    filtroPreco.value = "todos";

    // Atualiza os imóveis e o contador
    filtrarImoveis();

});

// ==========================================
// GALERIA DE FOTOGRAFIAS
// ==========================================

const botaoAnterior = document.getElementById("foto-anterior");
const botaoProxima = document.getElementById("proxima-foto");
const contadorFotos = document.getElementById("contador-fotos");
const imagemModal = document.getElementById("modal-imagem");


// Fotografias disponíveis para cada imóvel
const galerias = {

    casa: [
        "img/casa luxo.jfif",
        "img/casa-sala.jfif",
        "img/casa-quarto.jfif"
    ],

    apartamento: [
        "img/apartamento.jfif",
        "img/apartamento-sala.jfif",
        "img/apartamento-quarto.jfif"
    ],

    cobertura: [
        "img/cobertura.jfif",
        "img/cobertura-sala.jfif",
        "img/cobertura-terraco.jfif"
    ]

};


let fotosAtuais = [];
let fotoAtual = 0;

// Atualiza a fotografia exibida
function atualizarGaleria() {

    if (fotosAtuais.length === 0) {
        return;
    }

    imagemModal.src = fotosAtuais[fotoAtual];

    contadorFotos.textContent =
        (fotoAtual + 1) + " / " + fotosAtuais.length;

    // Esconde as setas quando só existe uma fotografia
    botaoAnterior.hidden = fotosAtuais.length <= 1;
    botaoProxima.hidden = fotosAtuais.length <= 1;

}

// Prepara a galeria ao abrir os detalhes
botoesDetalhes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const card = botao.closest(".imovel-card");
        const tipo = card.dataset.tipo;

        fotosAtuais = galerias[tipo] || [];
        fotoAtual = 0;

        atualizarGaleria();

    });

});

// Próxima fotografia
botaoProxima.addEventListener("click", function() {

    fotoAtual++;

    if (fotoAtual >= fotosAtuais.length) {
        fotoAtual = 0;
    }

    atualizarGaleria();

});

// Fotografia anterior
botaoAnterior.addEventListener("click", function() {

    fotoAtual--;

    if (fotoAtual < 0) {
        fotoAtual = fotosAtuais.length - 1;
    }

    atualizarGaleria();

});

// ==========================================
// NAVEGAÇÃO DA GALERIA PELO TECLADO
// ==========================================

document.addEventListener("keydown", function(evento) {

    // Só funciona quando o modal está aberto
    if (modal.hidden || fotosAtuais.length <= 1) {
        return;
    }

    // Seta direita: próxima fotografia
    if (evento.key === "ArrowRight") {
        evento.preventDefault();
        botaoProxima.click();
    }

    // Seta esquerda: fotografia anterior
    if (evento.key === "ArrowLeft") {
        evento.preventDefault();
        botaoAnterior.click();
    }

});
