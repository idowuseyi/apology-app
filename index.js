require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const apologyRoutes = require('./routes/apologyRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Apology API',
      version: '1.0.0',
      description: 'Apology API Information',
    },
    servers: [
      { url: `https://apology-app.onrender.com` },
      { url: `http://localhost:${PORT}` }],
  },
  apis: ['./routes/*.js'],
};

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Apology API',
    swagger: "<baseurl>/api-docs",
    authRoutes: "<baseurl>/api/auth",
    apologyRoutes: "<baseurl>/api/apologies"
   });
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', authRoutes);
app.use('/api/apologies', apologyRoutes);

app.listen(PORT, () => console.log(`Server running on  http://localhost:${PORT}`));