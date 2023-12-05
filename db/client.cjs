const {Client} = require('pg');
const client = new Client('postgres://localhost:5432/robot_shop');

module.exports = client;