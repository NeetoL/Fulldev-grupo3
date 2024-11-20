export const authMiddleware = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        next(); // Continua para a rota se estiver logado
    } else {
        res.redirect('/login'); // Redireciona para login se não estiver logado
    }
};
