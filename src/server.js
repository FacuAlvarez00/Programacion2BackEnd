const app = require('./app'); 
const connectDB = require('./config/mongoose')


const PORT = process.env.PORT || 3000;


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar con la base de datos:', err);
  });


  connectDB()