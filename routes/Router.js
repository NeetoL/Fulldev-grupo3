import express from 'express';
import * as HomeController from '../controllers/homeController.js';
import * as PainelController from '../controllers/painelController.js';

const router = express.Router();

//ROTAS PARA PUXAR INDEX
router.get('/', HomeController.index);    
router.get('/painel', PainelController.index);    
router.get('/logon', PainelController.logon);    

// ROTAS DE AÇÃO
router.get('/usuarios', HomeController.obterUsuarios);
router.post('/usuarios', HomeController.criarUsuario);
router.get('/usuarios/:id', HomeController.obterUsuarioPorId);
router.put('/usuarios/:id', HomeController.atualizarUsuario);
router.delete('/usuarios/:id', HomeController.deletarUsuario);

export default router;
