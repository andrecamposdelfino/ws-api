const conexao = require('./conexao')

module.exports = {
    listar: async () => {
        try {
            const query = "SELECT * FROM cliente"
            const [rows] = await conexao.query(query)
            return rows
        } catch (error) {
            console.log("Não conseguiu listar os dados da tabela: " + error);
            return [];
        }
    }, 
    
    listarIdCliente: async (id) => {
        try {
            const query = "SELECT * FROM cliente WHERE id = ?"
            const [rows] = await conexao.query(query, [id])
            return rows
        } catch (error) {
            console.log("Erro ao localizar cliente de ID " + id + ": " + error)
            return []
        }
    },

    criar: async (nome, email, telefone, endereco) => {
        try{
            const query = "INSERT INTO cliente(nome, email, telefone, endereco) VALUES(?,?,?,?)"
            const [result] = await conexao.query(query, [nome, email, telefone, endereco])
            return result
        }catch(error){
            console.log("Não foi possível adicionar o cliente: " + error)
            return null
        }
    },

    deletar: async (id) => {
        try{
            const query = "DELETE FROM cliente WHERE id = ?"
            const [result] = await conexao.query(query, [id])
            return result
        }catch(error){
            console.log("Não foi possível adicionar o cliente: " + error)
            return null 
        }
    }
}