const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const storeRoute = require('./Route/storeRoute');
const bookRoute = require('./Route/bookRoute');

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//1) Global middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1', storeRoute);
app.use('/api/v1', bookRoute);
