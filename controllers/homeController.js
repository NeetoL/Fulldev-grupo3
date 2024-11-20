import mongoose from 'mongoose';
import path from 'path';

const Usuario = mongoose.model('Usuario', new mongoose.Schema({
  nome: { type: String, required: true }
}));

// Método para obter a pagina index
export const index = (req, res) => {
    const filePath = path.join(process.cwd(), 'views', 'index.html');
    res.sendFile(filePath); 
  };

// Método para obter todos os usuários
export const obterUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter usuários', error: err });
  }
};

// Método para criar um novo usuário
export const criarUsuario = async (req, res) => {
  try {
    const { nome } = req.body;
    const novoUsuario = new Usuario({ nome });
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: err });
  }
};

// Método para obter um usuário específico por ID
export const obterUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter usuário', error: err });
  }
};

// Método para atualizar um usuário
export const atualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado para atualização' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: err });
  }
};

// Método para deletar um usuário
export const deletarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado para deleção' });
    }
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error: err });
  }
};
