const produtosModel = require('../services/produtosModel')

module.exports = {
    listarProdutos: async (req, res) => {
        try {
            const result = await produtosModel.listarProdutos()
            if(result && result.length > 0){
                res.status(200).json(result)
            }else{
                res.status(404).json({message: "Nenhum produto foi encontrado"})
            }
        } catch (error) {
            res.status(500).json({message: 'Erro ao listar os produtos', error: error.message})
        }
    },

    listarProdutoId: async (req, res) => {
        try {
            const {id} = req.params
            const idNum = parseInt(id, 10)
            if(!id || Number.isNaN(idNum)){
                return res.status(400).json({message: "ID Invalido"})
            }
            const result = await produtosModel.listarProdutoId(idNum)
            if(result && result.length > 0){
                return res.status(200).json(result[0])
            }else{
                return res.status(404).json({message: 'Produto não localizado'})
            }
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar o produto", error: error.message })
        }
    },

    criarProduto: async (req, res) => {
        try {
            const {titulo, descricao, preco, imagem_url} = req.body
            if(!titulo || !descricao || !preco || !imagem_url){
                return res.status(400).json({message: "Todos os campos são obrigatorios"})
            }
            const result = await produtosModel.criarProduto(titulo, descricao, preco, imagem_url)
            if(result && result.affectedRows > 0){
                res.status(201).json({message: "Produto cadastrado com sucesso", id: result.insertId})
            }else{
                res.status(400).json({message: "Nenhum produto foi cadastrado"})
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar o produto', error: error.message })
        }
    },

    deletar: async (req, res) => {
        try {
            const {id} = req.params
            const idNum = parseInt(id, 10)
            if(!id || Number.isNaN(idNum)){
                return res.status(400).json({message: "ID Invalido"})
            }
            const result = await produtosModel.deletar(idNum)
            if(result && result.length > 0){
                return res.status(200).json(result[0])
            }else{
                return res.status(400).json({message: "Produto não encontrado"})
            }
        } catch (error) {
            return res.status(500).json({message: "Erro ao buscar o produto", error})
        }
    },

    updateProduto: async (req, res) => {
        try {
            const {id} = req.params
            const {titulo, descricao, preco, imagem_url} = req.body

            const idNum = parseInt(id, 10)
            if(!id || Number.isNaN(idNum)){
                return res.status(400).json({message: "ID Invalido"})
            }

            if(!titulo && !descricao && !preco && !imagem_url){
                return res.status(400).json({message: "Pelo menos um campo deve ser informado"})
            }

            const result = await produtosModel.updateProduto(idNum, titulo, descricao, preco, imagem_url)

            if(result && result.affectedRows > 0){
                return res.status(200).json({message: "Produto atualizado com sucesso"})

            }else{
                return res.status(404).json({message: "Produto não encontrado"})
            }

        } catch (error) {
            return res.status(500).json({message: "Erro ao atualizar o produto", error: error.message})
        }
    }
}