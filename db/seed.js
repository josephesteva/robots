const client = require('./client.js');
const { createRobot } = require('./robots.js');
const { createTask } = require('./tasks.js');
const { createCustomer } = require('./customers.js');

const dropTables = async () => {
	try {
		await client.query(`
			DROP TABLE IF EXISTS robots;
			DROP TABLE IF EXISTS tasks;
			DROP TABLE IF EXISTS customers;

		`)
	} catch (err) {
		console.log(err);
	}
}

const createTables = async () => {
	try {
		await client.query(`
			CREATE TABLE robots (
				id SERIAL PRIMARY KEY,
				name VARCHAR(30) NOT NULL,
				model VARCHAR(30) UNIQUE,
				company VARCHAR(30) NOT NULL,
				img_url VARCHAR(200) NOT NULL,
				warranty_months INT,
				is_child_safe BOOLEAN NOT NULL,
				release_date DATE NOT NULL
			);

			CREATE TABLE tasks (
				id SERIAL PRIMARY KEY,
				name VARCHAR(30) UNIQUE
			);

			CREATE TABLE customers (
				id SERIAL PRIMARY KEY,
				name VARCHAR(30) NOT NULL,
				email VARCHAR(40) UNIQUE
			);
		`)
	} catch (err) {
		console.log(err);
	}
}

const syncAndSeed = async () => {
	await client.connect();
	console.log('Connected to DB');

	await dropTables();
	console.log('Tables Dropped');

	await createTables();
	console.log('Tables Created');
	
	const laundrybot = await createRobot('Laundrybot', '3000', 'RoboCorp', 'http://placekitten.com/200/300', 12, true, '2020-12-12');
	const cookotron = await createRobot('Cookotron', '4000', 'RoboCorp', 'http://placekitten.com/200/400', 24, true, '2023-12-12');
	console.log('Robots Created');
	
	const foldClothes = await createTask('Fold Clothes');
	const makeDinner = await createTask('Make Dinner');
	console.log('Tasks Created'); 
	
	const johnSmith = await createCustomer('John Sith', 'john.smith@mail.com');
	const janeDoe= await createCustomer('Jane Doe', 'jane.doe@mail.com');
	console.log('Customers Created'); 
	console.log(johnSmith); 

	client.end();
	console.log('Connection Ended');
}

syncAndSeed();