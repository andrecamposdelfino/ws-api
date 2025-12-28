const itemPedidoModel = require('../services/itemPedidoModel')

module.exports = {
    listarTodos: async (req, res) => {
        try {
            const result = await itemPedidoModel.listarTodos()
            if(result && result.length > 0){
                res.status(200).json(result)
            }else{
                res.status(404).json({message: "Nenhum item de pedido encontrado"})
            }
 
        } catch (error) {
            res.status(500).json({message: "Erro ao listar itens do pedido", error: error.message})
        }
    },

    listarItensPedidoId: async (req, res) => {
        try {
            const {id} = req.params
            const idNum = parseInt(id, 10)

            if(!id || Number.isNaN(idNum)){
                return res.status(400).json({message: "ID Invalido"})
            }
            const result = await itemPedidoModel.listarItensPedidoId(idNum)

            if(result && result.length > 0){
                return res.status(200).json(result[0])
            }else{
                return res.status(404).json({message: "Item de pedido não localizado"})
            }
        } catch (error) {
            return res.status(500).json({message: "Erro ao buscar o item de pedido", error: error.message})
        }
    },

    criarItemPedido: async (req, res) => {
        try {
            const {pedido_id, produto_id, quantidade, preco_unitario, observacoes} = req.body
            if(!pedido_id || !produto_id || !quantidade || !preco_unitario || !observacoes){
                return res.status(400).json({message: "Todos os campos são obrigatorios"})
            }

            const result = await itemPedidoModel.criarItemPedido(pedido_id, produto_id, quantidade, preco_unitario, observacoes)
            if(result && result.affectedRows > 0){
                return res.status(201).json({message: "Item de pedido adicionado", id: result.insertId})
            }else{
                return res.status(400).json({message: "Nenhum item de pedido foi cadastrado"})
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar o item de pedido', error: error.message })
        }
    },

    deletarItemPedido: async (req, res) => {
        try {
            const {id} = req.params
            const idNum = parseInt(id, 10)
            if(!id || Number.isNaN(idNum)){
                return res.status(400).json({message: "ID Invalido"})
            }
            const result = await itemPedidoModel.deletarItemPedido(idNum)
            if(result && result.affectedRows > 0){
                return res.status(200).json({message: "Item de pedido deletado"})
            }else{
                return res.status(404).json({message: "Item de pedido não foi deletado"})
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar o item de pedido', error: error.message })
        }
        
    },

    updateItemPedido: async (req, res) => {
        try {
            const {id} = req.params
            const {pedido_id, produto_id, quantidade, preco_unitario, observacoes} = req.body
            const idNum = parseInt(id, 10)

            if(!id || Number.isNaN(idNum)){
                return res.status(400).json({message: "ID Invalido"})
            }

            if(!pedido_id && !produto_id && !quantidade && preco_unitario && !observacoes){
                return res.status(400).json({message: "Pelo menos um campo deve ser informado"})
            }

            const result = await itemPedidoModel.updateItemPedido(idNum, pedido_id, produto_id, quantidade, preco_unitario, observacoes)
            if(result && result.affectedRows > 0){
                return res.status(200).json({message: "Item de padido atualizado"})
            }else{
                return res.status(404).json({message: "Item de pedido não localizado"})
            }
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar cliente", error: error.message })
        }
    }
}