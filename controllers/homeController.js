import Usuario from '../models/Usuarios.js';
import bcrypt from 'bcrypt';
import path from 'path';

export const index = (req, res) => {
  const filePath = path.join(process.cwd(), 'views', 'index.html');
  res.sendFile(filePath); 
}

export const logo = (req, res) => {
  const filePath = path.join(process.cwd(), 'views', 'assets', 'img', 'icon.fw.png');
  res.sendFile(filePath);
}

export const img1920 = (req, res) => {
    const filePath = path.join(process.cwd(), 'views', 'assets', 'img', '1920x1080.png');
    res.sendFile(filePath);
}

export const obterUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao buscar usuários', erro });
    }
}

export const criarUsuario = async (req, res) => {
  try {
      const { nome, email, senha, dataNascimento, telefone, endereco } = req.body;

      const usuarioExistente = await Usuario.findOne({ email });
      if (usuarioExistente) {
          return res.status(400).json({ mensagem: 'Email já cadastrado.' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const novoUsuario = new Usuario({
          nome,
          email,
          senha: senhaHash,
          dataNascimento,
          telefone,
          endereco
      });

      await novoUsuario.save();

      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (erro) {
      console.error('Erro ao cadastrar usuário:', erro);
      res.status(500).json({ mensagem: 'Erro ao cadastrar usuário', erro });
  }
}

export const obterUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        res.status(200).json(usuario);
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao buscar usuário', erro });
    }
}

export const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        const usuario = await Usuario.findByIdAndUpdate(id, dadosAtualizados, { new: true });

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado',dadosAtualizados });
        }

        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso', dadosAtualizados });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro });
    }
}

export const detalhes = (req, res) => {
    const painelPath = path.join(process.cwd(), 'views', 'detalhes.html');
    res.sendFile(painelPath);
}

export const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao deletar usuário', erro });
    }
}
