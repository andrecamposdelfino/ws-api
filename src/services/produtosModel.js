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
    },

    updateProduto: async (id, titulo, descricao, preco, imagem_url) => {
        try {
            const campos = []
            const valores = []

            if(titulo){
                campos.push("titulo = ?")
                valores.push(titulo)
            }

            if(descricao){
                campos.push("descricao = ?")
                valores.push(descricao)
            }

            if(preco){
                campos.push("preco = ?")
                valores.push(preco)
            }

            if(imagem_url){
                campos.push("imagem_url = ?")
                valores.push(imagem_url)
            }

            valores.push(id)

            const query = `UPDATE produtos SET ${campos.join(", ")} WHERE id = ?`
            const [result] = conexao.query(query, valores)
            return result

        } catch (error) {
            console.log("Não foi possível atualizar o produto: " + error)
            return null 
        }
    }
}