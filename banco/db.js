import mongoose from 'mongoose';

const uri = 'mongodb+srv://fulldevgrupo3:todomundovaiteracesso@cluster0.5dct6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB!');
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

export default mongoose;