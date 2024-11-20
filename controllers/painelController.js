import path from 'path';

// Exibir painel com verificação de login
export const index = (req, res) => {
    if (req.session && req.session.isLoggedIn) {
        const painelPath = path.join(process.cwd(), 'views', 'painel.html');
        res.sendFile(painelPath);
    } else {
        const loginPath = path.join(process.cwd(), 'views', 'login.html');
        res.sendFile(loginPath);
    }
};

export const logon = (req, res) => {
    const painelPath = path.join(process.cwd(), 'views', 'logon.html');
    res.sendFile(painelPath);    
};

// Processar login
export const processLogin = (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '1234') {
        req.session.isLoggedIn = true;
        res.redirect('/');
    } else {
        res.status(401).send('Usuário ou senha inválidos.');
    }
};

// Processar logout
export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Erro ao fazer logout.');
        }
        res.redirect('/login');
    });
};
