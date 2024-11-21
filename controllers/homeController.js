import Usuario from '../models/Usuarios.js';
import bcrypt from 'bcrypt';
import path from 'path';

// Método para obter a pagina index
export const index = (req, res) => {
  const filePath = path.join(process.cwd(), 'views', 'index.html');
  res.sendFile(filePath); 
};


export const logo = (req, res) => {
  const filePath = path.join(process.cwd(), 'views', 'assets', 'img', 'icon.fw.png');
  res.sendFile(filePath);
}

// Obter todos os usuários
export const obterUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao buscar usuários', erro });
    }
};

// Função para criar um novo usuário
export const criarUsuario = async (req, res) => {
  try {
      const { nome, email, senha, dataNascimento, telefone, endereco } = req.body;

      // Verifica se o email já está cadastrado
      const usuarioExistente = await Usuario.findOne({ email });
      if (usuarioExistente) {
          return res.status(400).json({ mensagem: 'Email já cadastrado.' });
      }

      // Criptografa a senha antes de salvar
      const senhaHash = await bcrypt.hash(senha, 10); // Ajuste o saltRounds conforme necessário

      // Cria um novo usuário com a senha criptografada
      const novoUsuario = new Usuario({
          nome,
          email,
          senha: senhaHash, // Atribui a senha criptografada ao campo 'senha'
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
};

// Obter um usuário pelo ID
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
};

export const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        const usuario = await Usuario.findByIdAndUpdate(id, dadosAtualizados, { new: true });

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso', usuario });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro });
    }
};

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
};
