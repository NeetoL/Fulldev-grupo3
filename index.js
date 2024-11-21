import express from 'express';
import session from 'express-session';
import ejsLayouts from 'express-ejs-layouts';
import homeRouter from './routes/Router.js';
import './banco/db.js';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3000;

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const pathToAssets = path.join(__dirname, '..', 'views', 'assets');
app.use('/partials', express.static(path.join(process.cwd(), 'views/partials')));

app.use(express.static(pathToAssets));

app.use(express.json());
app.set('view engine', 'ejs');

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(cors({
  origin: `http://localhost:${port}`,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Rotas
app.use('/', homeRouter);

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
