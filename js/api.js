const api = {

    async buscarPensamentos() {
        try {
            const response = await fetch ('http://localhost:3000/pensamentos');
            return await response.json();
        } catch {
            alert('ERROR: Busca de pensamentos');
            throw error;
        }
    },

    async salvarPensamentos(pensamento) {
        try {
            const response = await fetch ('http://localhost:3000/pensamentos', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(pensamento)
            });
            return await response.json();
        } catch {
            alert('ERROR: Busca de pensamentos');
            throw error;
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await fetch (`http://localhost:3000/pensamentos/${id}`);
            return await response.json();
        } catch {
            alert(`ERROR: Busca de pensamento de id: ${id}`);
            throw error;
        }
    },

    async editarPensamento(pensamento) {
        try {
            const response = await fetch (`http://localhost:3000/pensamentos/${pensamento.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(pensamento)
            });
            return await response.json();
        } catch {
            alert('ERROR: Ao editar pensamento');
            throw error;
        }
    },
}

export default api;