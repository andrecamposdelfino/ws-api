const conexao = require('../services/conexao')

module.exports = {
    listarTodos: async () => {
        try {
            const query = "SELECT * FROM itens_pedido"
            const [result] = await conexao.query(query)
            return result
        } catch (error) {
            console.log("Erro ao listar itens do pedido: " + error)
            return []
        }
    },
    listarItensPedidoId: async (id) => {
        try {
            const query = "SELECT * FROM itens_pedido WHERE id = ?"
            const [result] = await conexao.query(query, [id])
            return result
        } catch (error) {
            console.log("Erro ao listar itens do pedido: " + error)
            return []
        }
    },

    criarItemPedido: async (cliente_id, produto_id, quantidade, preco_unitario, observacoes) => {
        try {
            const query = "INSERT INTO itens_pedido (cliente_id, produto_id, quantidade, preco_unitario, observacoes) VALUES (?, ?, ?, ?, ?)"
            const [result] = await conexao.query(query, [cliente_id, produto_id, quantidade, preco_unitario, observacoes])
            return result
        } catch (error) {
            console.log("Erro ao criar o item do pedido ", error);
            return []
        }
    },

    deletarItemPedido: async (id) => {
        try {
            const query = "DELETE FROM itens_pedido WHERE id = ?"
            const [result] = await conexao.query(query, [id])
            return result
        } catch (error) {
            console.log("Erro ao deletar itens do pedido: " + error)
            return []
        }
    },

    updateItemPedido: async (cliente_id, produto_id, quantidade, preco_unitario, observacoes, id) => {
        try {
            const query = "UPDATE itens_pedido SET cliente_id = ?, produto_id = ?, quantidade = ?, preco_unitario = ?, observacoes = ? WHERE id = ?"
            const [result] = await conexao.query(query, [cliente_id, produto_id, quantidade, preco_unitario, observacoes, id])
            return result
        } catch (error) {
            console.log("Erro ao atualizar itens do pedido: " + error)
            return []
        }
    }
}