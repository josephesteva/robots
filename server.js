const express = require('express');
const app = express();

const client = require('./db/client.js');
client.connect();

app.get('/', (req, res) => {
	res.send('<h1>Temp Home Page</h1>')
})

app.use('/api/v1', require('./api/index.js'));

PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));