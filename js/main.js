import ui from "./ui.js";
import api from "./api.js"

const regexConteudo = /^[A-Za-z\s]{10,}$/;
const regexAutoria = /^[A-Za-z]{3,15}$/;

function validarConteudo(conteudo) {
    return regexConteudo.test(conteudo);
}

function validarAutoria(autoria) {
    return regexAutoria.test(autoria);
}

function removerEspacos(str){
    return str.replaceAll(/\s+/g, '');
}

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();
    //Submetendo o formulário para criar um novo dado
    const formularioPensamento = document.getElementById("pensamento-form");
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);

    const btnCancelar = document.getElementById("botao-cancelar");
    btnCancelar.addEventListener("click", () => {
        document.getElementById("pensamento-form").reset();
    });

    const inputBusca = document.getElementById("campo-busca");
    inputBusca.addEventListener("input", manipularBusca);
});

async function manipularSubmissaoFormulario(evento) {
    evento.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;
    const data = document.getElementById("pensamento-data").value;
    const conteudoSemEspaco = removerEspacos(conteudo);
    const autoriaSemEspaco = removerEspacos(autoria);

    if(!validarConteudo(conteudoSemEspaco)){
        alert("É permitida a inclusão apenas de letras e espaços com no mínimo 10 caracteres");
        return;
    }

    if(!validarAutoria(autoriaSemEspaco)){
        alert("Somente é permitida autoria apenas de letras com no mínimo 3 e máximo de 15 caracteres!!");
        return;
    }

    if(!validarData(data)){
        alert("Não é permitido cadastro de datas futuras!!!");
        return;
    }

    try {
        if (id) await api.editarPensamento({id, conteudo, autoria, data});
        else await api.salvarPensamentos({conteudo, autoria, data});
        ui.renderizarPensamentos();
    } catch {
        alert("ERROR: Não foi possível salvar pensamentos");
    }
}

async function manipularBusca() {
    const termoBusca = document.getElementById("campo-busca").value;
    try {
        const pensamentosFiltrados = await api.buscarPensamentosPorTermo(termoBusca);
        ui.renderizarPensamentos(pensamentosFiltrados);
    } catch (error) {
        alert("ERROR: ao fazer a busca");
    }
}

function validarData(data) {
    const dataAtual = new Date();
    const dataInserida = new Date(data);
    return dataInserida <= dataAtual;
}