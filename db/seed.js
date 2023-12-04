const client = require('./client.js');

const syncAndSeed = async () => {
	await client.connect();
	console.log('Connected to DB');

	client.end();
	console.log('Connection Ended');
}

syncAndSeed();