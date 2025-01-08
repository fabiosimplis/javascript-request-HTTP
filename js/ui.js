import api from "./api.js";

const ui = {

    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);
        document.getElementById("pensamento-id").value = pensamento.id;
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
        document.getElementById("pensamento-autoria").value = pensamento.autoria;
        document.getElementById("pensamento-data").value = pensamento.data.toISOString().split('T')[0];
        // Ajustando foco da app
        document.getElementById("form-container").scrollIntoView();
    },

    async renderizarPensamentos(pensamentosFiltrados = null) {
        const listaPensamentos = document.getElementById("lista-pensamentos");
        const mensagemVazia = document.getElementById("mensagem-vazia");
        listaPensamentos.innerHTML = "";
        try {
            let pensamentosParaRenderizar;
            if (pensamentosFiltrados) {
                pensamentosParaRenderizar = pensamentosFiltrados;
            } else {
                pensamentosParaRenderizar = await api.buscarPensamentos()
            }
            if (pensamentosParaRenderizar.length === 0) {
                mensagemVazia.style.display = "block";
            } else {
                mensagemVazia.style.display = "none";
                pensamentosParaRenderizar.forEach(ui.adicionarPensamentoNaLista);
            }
        } catch {
            alert('Erro ao renderizar pensamentos')
        }
    },

    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.getElementById("lista-pensamentos");
        const li = document.createElement("li");
        li.setAttribute("data-id", pensamento.id);
        li.classList.add("li-pensamento");

        const iconesAspas = document.createElement("img");
        iconesAspas.src = "./assets/imagens/aspas-azuis.png";
        iconesAspas.alt = "Aspas azuis"
        iconesAspas.classList.add("icone-aspas");

        const pensamentoConteudo = document.createElement("div");
        pensamentoConteudo.textContent = pensamento.conteudo;
        pensamentoConteudo.classList.add("pensamento-conteudo");

        const pensamentoAutoria = document.createElement("div");
        pensamentoAutoria.textContent = pensamento.autoria;
        pensamentoAutoria.classList.add("pensamento-autoria");

        let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        }
        const pensamentoData = document.createElement("div");
        // pensamentoData.textContent = pensamento.data.toLocaleDateString('pt-BR');
        const dataFormatada = pensamento.data.toLocaleDateString('pt-BR', options);
        const dataComRegex = dataFormatada.replace(/^(\w)/, (match) => match.toUpperCase());
        pensamentoData.textContent = dataComRegex;
        pensamentoData.classList.add("pensamento-data");

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botao-editar");
        botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id);

        const iconeEditar = document.createElement("img");
        iconeEditar.src = "./assets/imagens/icone-editar.png";
        iconeEditar.alt = "Botão Editar";
        botaoEditar.appendChild(iconeEditar);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id);
                ui.renderizarPensamentos();
            } catch (error) {
                alert(`ERROR: Erro ao excluir pensamento de id: ${pensamento.id}`);
            }
        }

        const iconeExcluir = document.createElement("img");
        iconeExcluir.src = "./assets/imagens/icone-excluir.png";
        iconeExcluir.alt = "Botão Excluir";
        botaoExcluir.appendChild(iconeExcluir);

        const botaoFavorito = document.createElement("button");
        botaoFavorito.classList.add("botao-favorito");
        botaoFavorito.onclick = async () => {
            try {
                await api.atualizarFavorito(pensamento.id, !pensamento.favorito);
                ui.renderizarPensamentos();
            } catch (error) {
                alert("ERROR: ao atualizar o pensamento");
            }
        }

        const iconeFavorito = document.createElement("img");
        iconeFavorito.src = pensamento.favorito ? 
        "./assets/imagens/icone-favorito.png" :
        "./assets/imagens/icone-favorito_outline.png";
        iconeFavorito.alt = "Ícone de Favorito";
        botaoFavorito.appendChild(iconeFavorito);

        const divIcones = document.createElement("div");
        divIcones.classList.add("icones");
        divIcones.appendChild(botaoFavorito);
        divIcones.appendChild(botaoEditar);
        divIcones.appendChild(botaoExcluir);

        li.appendChild(iconesAspas);
        li.appendChild(pensamentoConteudo);
        li.appendChild(pensamentoAutoria);
        li.appendChild(pensamentoData);
        li.appendChild(divIcones);
        listaPensamentos.appendChild(li);
    },
}

export default ui;