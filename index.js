import express from 'express';
import homeRouter from './routes/Router.js';
import './banco/db.js';  // Banco de dados

const app = express();
const port = 3000;

app.use(express.json());  // Permite o parsing de JSON no corpo da requisição

app.use('/', homeRouter);
app.use('/painel', homeRouter);
app.use('/logon', homeRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
