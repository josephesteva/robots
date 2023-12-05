const express = require('express');
const app = express();

const client = require('./db/client.cjs');
client.connect();

app.get('/', (req, res) => {
	res.send('<h1>Temp Home Page</h1>')
})

app.use('/api/v1', require('./api/index.cjs'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));