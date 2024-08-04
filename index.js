const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost/${PORT} or use the swagger-ui @ http://localhost/${PORT}/api-docs`));

// const express = require('express');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');
// const apologyRoutes = require('./routes/apology');
// const sequelize = require('./config/database');

// // Set up the Express app
// const app = express();

// // Middleware
// app.use(express.json());

// // Swagger setup
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: 'Apology API',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./routes/*.js'],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Routes
// app.use('/apologies', apologyRoutes);

// // Connect to the database
// sequelize.sync({ force: true }).then(() => {
//   console.log('Database connected!');
//   // Start the server
//   app.listen(3000, () => {
//     console.log('Server running on port 3000');
//   });
// });
