const clienteModel = require('../services/clienteModel')

module.exports = {
    listar: async (req, res) => {
        try {
            const rows = await clienteModel.listar()
            if (rows && rows.length > 0) {
                res.status(200).json(rows)
            } else {
                res.status(404).json({ message: 'Nenhum cliente encontrado' })
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar clientes', error: error.message })
        }
    },

    listarIdCliente: async (req, res) => {
        try {
            const { id } = req.params
            const idNum = parseInt(id, 10)
            if (!id || Number.isNaN(idNum)) {
                return res.status(400).json({ message: "ID inválido" })
            }
            const rows = await clienteModel.listarIdCliente(idNum)
            if (rows && rows.length > 0) {
                return res.status(200).json(rows[0])
            } else {
                return res.status(404).json({ message: 'Cliente não encontrado' })
            }

        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar cliente", error: error.message })
        }

    },

    criar: async (req, res) => {
        try {
            const { nome, email, telefone, endereco } = req.body
            
            if (!nome || !email || !telefone || !endereco) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
            }
            
            const result = await clienteModel.criar(nome, email, telefone, endereco)
            if (result && result.affectedRows > 0) {
                res.status(201).json({ message: "Cliente cadastrado com sucesso", id: result.insertId })
            } else {
                res.status(400).json({ message: 'Nenhum cliente foi cadastrado' })
            }

        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar o cliente', error: error.message })
        }
    },

    deletar: async (req, res) => {
        try {
            const {id} = req.params
            const idNum = parseInt(id, 10)
            if(!id || Number.isNaN(idNum)){
                return res.status(400).json({message: "ID Invalido"})
            }
            const rows = await clienteModel.deletar(idNum)
            if(rows && rows.length > 0){
                return res.status(200).json(rows[0])
            }else{
                return res.status(404).json({message: "Cliente não encontado"})
            }
        } catch (error) {
            return res.status(500).json({message: "Erro ao buscar cliente", error: error.message})
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params
            const { nome, email, telefone, endereco } = req.body
            
            const idNum = parseInt(id, 10)
            if (!id || Number.isNaN(idNum)) {               
                return res.status(400).json({ message: "ID inválido" })
            }
            
            if (!nome && !email && !telefone && !endereco) {
                return res.status(400).json({ message: 'Pelo menos um campo deve ser informado' })
            }
            
            const result = await clienteModel.update(idNum, nome, email, telefone, endereco)
            if (result && result.affectedRows > 0) {
                return res.status(200).json({ message: "Cliente atualizado com sucesso" })
            } else {
                return res.status(404).json({ message: 'Cliente não encontrado' })
            }
            
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar cliente", error: error.message })
        }
    }
}