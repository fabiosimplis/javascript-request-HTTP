import ui from "./ui.js";
import api from "./api.js"

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
    try {
        if (id) await api.editarPensamento({id, conteudo, autoria});
        else await api.salvarPensamentos({conteudo, autoria});
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