const router = require('express').Router()
const clienteController = require('./controller/clienteController')
const produtosController = require('./controller/produtosController')

router.get('/cliente', clienteController.listar)
router.get('/cliente/:id', clienteController.listarIdCliente)
router.delete('/cliente/:id', clienteController.deletar)
router.post('/cliente', clienteController.criar)
router.put('/cliente/:id', clienteController.update)

router.get('/produtos', produtosController.listarProdutos)
router.get('/produtos/:id', produtosController.listarProdutoId)
router.post('/produtos', produtosController.criarProduto)
router.delete('/produtos/:id', produtosController.deletar)
router.put('/produtos/:id', produtosController.updateProduto)

module.exports = router