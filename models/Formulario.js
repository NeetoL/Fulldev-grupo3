import mongoose from '../banco/db.js';

const formularioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    },
    validade: {
        type: Date,
        required: false
    },
    campos: [
        {
            campo: { type: String, required: true },
            tipo: { type: String, required: true }
        }
    ],
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Referencia ao modelo de usuário
        required: true
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

const Formulario = mongoose.model('Formulario', formularioSchema);

export default Formulario;
