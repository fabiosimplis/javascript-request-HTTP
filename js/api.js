const URL_BASE = 'http://localhost:3000';

const converteStringParaDataUTC = (dataString) => {
    //2025-08-12 = [2024, 8, 12]
    const [ano, mes, dia] = dataString.split("-");
    const data = new Date(Date.UTC(ano, mes-1, dia));
    const now = new Date();
    
    // Atualiza a data para incluir a hora exata
    data.setUTCHours(now.getUTCHours());
    data.setUTCMinutes(now.getUTCMinutes());
    data.setUTCSeconds(now.getUTCSeconds());
    data.setUTCMilliseconds(now.getUTCMilliseconds());
    return data;
}

const api = {

    async buscarPensamentos() {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos`);
            return await response.data;
        } catch {
            alert('ERROR: Busca de pensamentos');
            throw error;
        }
    },

    async salvarPensamentos(pensamento) {
        try {
            const data = converteStringParaDataUTC(pensamento.data);
            const response = await axios.post(`${URL_BASE}/pensamentos`, {
                ...pensamento,
                data
            });
            return await response.data;
        } catch {
            alert('ERROR: Ao Salvar o pensamento');
            throw error;
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`);
            return await response.data;
        } catch {
            alert(`ERROR: Busca de pensamento de id: ${id}`);
            throw error;
        }
    },

    async editarPensamento(pensamento) {
        try {
            const data = converteStringParaDataUTC(pensamento.data);
            const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, {
                ...pensamento,
                data
        });

            return await response.data;
        } catch {
            alert('ERROR: Ao editar pensamento');
            throw error;
        }
    },

    async excluirPensamento(id) {
        try {
            const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`);
        } catch {
            alert('ERROR: Ao excluir pensamento');
            throw error;
        }
    },

    async buscarPensamentosPorTermo(termo) {
        try {
            const pensamentos = await this.buscarPensamentos();
            return pensamentos.filter(pensamento => {
                return (pensamento.conteudo.toLowerCase().includes(termo.toLowerCase())) || (pensamento.autoria.toLowerCase().includes(termo.toLowerCase()));
            });
        } catch (error){
            alert("ERROR: Ao filtrar pensamentos");
            throw error;
        }
    },

    async atualizarFavorito(id, favorito){
        try {
            const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, { favorito });
            return response.data;
        } catch (error) {
            alert("ERRO: Erro ao favoritar.");
            throw error;
        }
    },
}

export default api;