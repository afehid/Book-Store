const express = require('express');
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const storeRoute = require('../Route/storeRoute');
const bookRoute = require('../Route/bookRoute');
const userRoute = require('../Route/userRoute');
const loginRoute = require('../Route/loginRoute');
const exportRoute = require('../Route/exportRoute');

// var bodyParser = require('body-parser');

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//1) Global middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/static', express.static('node_modules'));

app.get('/', function(req, res) {
  // res.send("Server started ........");
  res.sendFile(path.join(__dirname, '.././index.html'));
});

app.use('/api/v1', storeRoute);
app.use('/api/v1', bookRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', loginRoute);
app.use('/api/v1', exportRoute);

module.exports = app;
