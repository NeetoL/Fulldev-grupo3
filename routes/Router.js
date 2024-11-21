import express from 'express';
import * as HomeController from '../controllers/homeController.js';
import * as PainelController from '../controllers/painelController.js';

const router = express.Router();

// Rotas principais
router.get('/', HomeController.index); // Página inicial
router.get('/painel', PainelController.index); // Painel principal
router.get('/logon', PainelController.logon); // Página de login
router.get('/logout', PainelController.logout); // Logout do sistema

// Rotas de ações
router.post('/processLogin', PainelController.processLogin); // Processa login
router.get('/usuarios', HomeController.obterUsuarios); // Lista usuários
router.post('/usuarios', HomeController.criarUsuario); // Cria novo usuário
router.get('/usuarios/:id', HomeController.obterUsuarioPorId); // Obtém usuário por ID
router.put('/usuarios/:id', HomeController.atualizarUsuario); // Atualiza usuário por ID
router.delete('/usuarios/:id', HomeController.deletarUsuario); // Deleta usuário por ID
router.post('/cadastro', HomeController.criarUsuario); // Cadastra novo usuário

// Rotas dinâmicas do painel
router.post('/painel/dashboard/:tela', PainelController.dashboard); // Carrega páginas dinâmicas

// Logo da aplicação
router.get('/logo', HomeController.logo); // Obtém logo da aplicação

export default router;
