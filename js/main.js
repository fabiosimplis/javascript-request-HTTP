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
});

async function manipularSubmissaoFormulario(evento) {
    evento.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;

    try {
        await api.salvarPensamentos({conteudo, autoria});
        ui.renderizarPensamentos();
    } catch {
        alert("ERROR: Não foi possível salvar pensamentos");
    }
}