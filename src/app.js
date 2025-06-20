const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const app = express();
require('dotenv').config();

const connectDB = require('./config/mongoose');
connectDB(); 

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


const productosRoutes = require('./routes/productos.routes');
app.use('/api/productos', productosRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const adminRoutes = require('./routes/admin.routes');
app.use('/admin', adminRoutes);

const ordenesRoutes = require('./routes/ordenes.routes');
app.use('/api/ordenes', ordenesRoutes);

module.exports = app;
