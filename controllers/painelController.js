import path from 'path';
import Usuario from '../models/Usuarios.js';
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
            theme: 1
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