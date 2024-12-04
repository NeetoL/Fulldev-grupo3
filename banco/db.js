import mongoose from 'mongoose';

const uri = 'mongodb+srv://fulldevgrupo3:todomundovaiteracesso@cluster0.5dct6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
    });
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

connectToDatabase();

export default mongoose;