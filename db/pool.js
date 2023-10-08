const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  connectionTimeoutMillis: 300,
  idleTimeoutMillis: 200,
  max: 20,
  connectionString: process.env.DATABASE_URL
};

const pool = new Pool(config);

pool.on('connect', () => {
  console.log('Database connection established');
});

pool.on('remove', () => {
  console.log('Database connection removed');
});

module.exports = pool;
