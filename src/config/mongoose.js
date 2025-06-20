const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/base_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('No se pudo conectar a MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
