const express = require('express');
const router = express.Router();

// Importando os controllers
const motoristaController = require('./controllers/controllermotorista');
const pedidoController = require('./controllers/controllerpedidos');

// Rotas para Motoristas
router.post('/motoristas', motoristaController.create);
router.get('/motoristas', motoristaController.read);
router.get('/motoristas/:id', motoristaController.readOne);
router.put('/motoristas/:id', motoristaController.update);
router.delete('/motoristas/:id', motoristaController.remove);

// Rotas para Pedidos
router.post('/pedidos', pedidoController.create);
router.get('/pedidos', pedidoController.read);
router.get('/pedidos/:id', pedidoController.readOne);
router.put('/pedidos/:id', pedidoController.update);
router.delete('/pedidos/:id', pedidoController.remove);

module.exports = router;