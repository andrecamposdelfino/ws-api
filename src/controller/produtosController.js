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
    }
}