const conexao = require('./conexao')

module.exports = {
    listarProdutos: async () => {
        try {
            const query = "SELECT * FROM produtos"
            const [result] = await conexao.query(query)
            return result
        } catch (error) {
            console.log("Não foram listados os produtos " + error);
            return []
        }
    },

    listarProdutoId: async (id) => {
        try {
            const query = "SELECT * FROM produtos WHERE id = ? "
            const [result] = await conexao.query(query, [id])
            return result
        } catch (error) {
            console.log("Erro ao localizar produto de ID " + id + ": " + error)
            return []
        }
    },

    criarProduto: async (titulo, descricao, preco, imagem_url) => {
        try {
            const query = "INSERT INTO produtos(titulo, descricao, preco, imagem_url)VALUES(?,?,?,?)"
            const [result] = await conexao.query(query, [titulo, descricao, preco, imagem_url])
            return result
        } catch (error) {
            console.log("Erro produto não foi cadastrado " + error);
            return null
        }
    },

    deletar: async (id) => {
        try {
            const query = "DELETE FROM produtos WHERE id = ?"
            const [result] = await conexao.query(query, [id])
            return result
        } catch (error) {
             console.log("Erro produto não foi excluido " + error);
            return null
        }
    }
}