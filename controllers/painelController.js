import path from 'path';
import Usuario from '../models/Usuarios.js';
import Formulario from '../models/Formulario.js';
import bcrypt from 'bcrypt';

export const index = (req, res) => {
    if (req.session && req.session.isLoggedIn) {
        let nomeCompleto = req.session.usuarioNome || "";
        let partesNome = nomeCompleto.trim().split(" ");

        // Filtrar apenas o primeiro e o último nome
        let nomeFiltrado = partesNome.length > 1
            ? `${partesNome[0]} ${partesNome[partesNome.length - 1]}`
            : partesNome[0]; // Caso o nome tenha apenas uma palavra

        const usuario = {
            nome: nomeFiltrado,
            nomeCompleto: nomeCompleto,
            email: req.session.usuarioEmail,
            id: req.session.usuarioId
        };

        res.render('painel', { usuario }); 
    } else {
        res.render('login');
    }
};

export const logon = (req, res) => {
    const painelPath = path.join(process.cwd(), 'views', 'logon.html');
    res.sendFile(painelPath);
};

export const processLogin = async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        return res.status(401).send('Credenciais inválidas.');  // Mensagem genérica
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        return res.status(401).send('Credenciais inválidas.');  // Mensagem genérica
    }

    req.session.isLoggedIn = true;
    req.session.usuarioId = usuario._id;
    req.session.usuarioNome = usuario.nome;

    res.status(200).json({
        logado : req.session.isLoggedIn,
        sessaoUsuarioId : req.session.usuarioId,
        sessaoUsuario : req.session.usuarioNome
    });
    
};

export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Erro ao fazer logout.');
        }
        res.redirect('/painel'); 
    });
};

export const dashboard = (req, res) => {
    const tela = req.params.tela; 
    const filePath = path.join(process.cwd(), 'views', 'partials', `${tela}.html`);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Página não encontrada.');
        }
    });
};

export const criarFormulario = async (req, res) => {
    const { nome, descricao, validade, campos, usuario_id } = req.body;

    try {
        // Verifica se o criadorId corresponde a um usuário válido
        const usuario = await Usuario.findById(usuario_id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Criação de um novo formulário
        const novoFormulario = new Formulario({
            nome,
            descricao,
            validade,
            campos,
            usuario_id
        });

        // Salva o formulário no banco de dados
        await novoFormulario.save();

        // Retorna uma resposta de sucesso com os dados do novo formulário
        res.status(201).json({
            message: 'Formulário criado com sucesso!',
            formulario: novoFormulario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o formulário.', error: error.message });
    }
};

export const obterFormulario = async (req, res) => {
    try {
        const formularios = await Formulario.find();

        // Retorna os formulários encontrados
        res.status(200).json({
            message: 'Formulários obtidos com sucesso!',
            formularios
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter os formulários.', error: error.message });
    }
};

export const obterFormularioPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const formulario = await Formulario.findOne({ usuario_id: id }).populate('usuario_id', 'nome email');

        if (!formulario) {
            return res.status(200).json({ codigo : 1, message: 'Formulário não encontrado.' });
        }

        res.status(200).json({
            codigo : 0,
            message: 'Formulário obtido com sucesso!',
            formulario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter o formulário.', error: error.message });
    }
};

export const atualizarFormulario = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, validade, campos } = req.body;

    try {
        // Buscar o formulário existente pelo ID
        const formulario = await Formulario.findById(id);

        if (!formulario) {
            return res.status(404).json({ message: 'Formulário não encontrado.' });
        }

        // Atualiza os dados do formulário
        formulario.nome = nome || formulario.nome;
        formulario.descricao = descricao || formulario.descricao;
        formulario.validade = validade || formulario.validade;
        formulario.campos = campos || formulario.campos;

        // Salva o formulário atualizado
        await formulario.save();

        // Retorna o formulário atualizado
        res.status(200).json({
            message: 'Formulário atualizado com sucesso!',
            formulario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o formulário.', error: error.message });
    }
};

export const deletarFormulario = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar e deletar o formulário pelo ID
        const formulario = await Formulario.findByIdAndDelete(id);

        if (!formulario) {
            return res.status(404).json({ message: 'Formulário não encontrado.' });
        }

        // Retorna mensagem de sucesso
        res.status(200).json({
            message: 'Formulário deletado com sucesso!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar o formulário.', error: error.message });
    }
};