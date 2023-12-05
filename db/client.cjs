const {Client} = require('pg');
const connection = process.env.DATABASE_URL || 'postgres://localhost:5432/robot_shop';
const client = new Client(connection);

module.exports = client;