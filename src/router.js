const router = require('express').Router()
const clienteController = require('./controller/clienteController')

router.get('/cliente', clienteController.listar)
router.get('/cliente/:id', clienteController.listarIdCliente)
router.delete('/cliente/:id', clienteController.listarIdCliente)
router.post('/cliente', clienteController.criar)

module.exports = router