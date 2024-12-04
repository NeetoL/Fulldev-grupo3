import mongoose from 'mongoose';

const uri = 'mongodb+srv://fulldevgrupo3:todomundovaiteracesso@cluster0.5dct6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,  // Número máximo de conexões simultâneas
    });
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    // Em caso de erro, loga o erro
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra o processo se não conseguir conectar
  }
};

// Conecta ao MongoDB na inicialização
connectToDatabase();

// Exporta o mongoose para ser utilizado em outras partes da aplicação
export default mongoose;