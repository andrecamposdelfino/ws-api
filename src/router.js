const router = require('express').Router()
const clienteController = require('./controller/clienteController')
const produtosController = require('./controller/produtosController')
const itemPedidoController = require('./controller/itemPedidoController')

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

router.get('/itempedido', itemPedidoController.listarTodos)
router.get('/itempedido/:id', itemPedidoController.listarItensPedidoId)
router.post('/itempedido', itemPedidoController.criarItemPedido)
router.delete('/itempedido/:id', itemPedidoController.deletarItemPedido)
router.put('/itempedido/:id', itemPedidoController.updateItemPedido)

module.exports = router