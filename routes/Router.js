import express from 'express';
import * as HomeController from '../controllers/homeController.js';
import * as PainelController from '../controllers/painelController.js';

const router = express.Router();

// Rotas principais
router.get('/', HomeController.index);
router.get('/painel', PainelController.index);
router.get('/logon', PainelController.logon);
router.get('/logout', PainelController.logout);

// Rotas de ações
router.post('/processLogin', PainelController.processLogin);
router.get('/usuarios', HomeController.obterUsuarios);
router.post('/usuarios', HomeController.criarUsuario);
router.get('/usuarios/:id', HomeController.obterUsuarioPorId);
router.put('/usuarios/:id', HomeController.atualizarUsuario);
router.delete('/usuarios/:id', HomeController.deletarUsuario);
router.post('/cadastro', HomeController.criarUsuario);
router.post('/cadastroFormulario', PainelController.criarFormulario);
//FORMULARIO
router.get('/Formulario', PainelController.obterFormulario);
router.get('/Formulario/:id', PainelController.obterFormularioPorId);
router.put('/Formulario/:id', PainelController.atualizarFormulario);
router.delete('/Formulario/:id', PainelController.deletarFormulario);

// Rotas dinâmicas do painel
router.post('/painel/dashboard/:tela', PainelController.dashboard);

// Logo da aplicação
router.get('/logo', HomeController.logo);

export default router;