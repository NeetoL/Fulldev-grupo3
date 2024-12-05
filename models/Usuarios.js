import mongoose from '../banco/db.js';

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: Date,
        required: true
    },
    telefone: {
        type: String,
        required: false
    },
    endereco: {
        rua: { type: String, required: false },
        numero: { type: String, required: false },
        cidade: { type: String, required: false },
        estado: { type: String, required: false },
        cep: { type: String, required: false }
    },
    nivelAcesso: {
        type: String,
        required: true,
        enum: ['admin', 'moderador', 'usuario'],
        default: 'usuario'
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
