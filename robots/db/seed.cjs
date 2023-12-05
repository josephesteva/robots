const client = require('./client.cjs');
const { createRobot } = require('./robots.js');
const { createTask } = require('./tasks.cjs');
const { createCustomer } = require('./customers.js');
const { createRobotTask } = require ('./robotsTasks.js');
const {createRobotCustomer} = require('./robotsCustomers.js');

const dropTables = async () => {
	try {
		await client.query(`
			DROP TABLE IF EXISTS robots_tasks;
			DROP TABLE IF EXISTS robots_customers;
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

			CREATE TABLE robots_tasks (
				robot_id INT NOT NULL,
				task_id INT NOT NULL
			);

			CREATE TABLE robots_customers (
				robot_id INT NOT NULL,
				customer_id INT NOT NULL
			)
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
	const cookotron = await createRobot('Cookotron', '4000', 'RoboCorp', 'http://placekitten.com/200/300', 12, false, '2023-12-12');
	const cookotronx = await createRobot('Cookotron', 'X7000', 'RoboCorp', 'http://placekitten.com/200/300', 24, true, '2023-12-12');
	const Zoomba = await createRobot('Zoomba', 'X81', 'BotBuilder', 'http://placekitten.com/200/300', 6, true, '2023-12-12');
	const gardendroid = await createRobot('Gardendroid', 'Z17', 'BotBuilder', 'http://placekitten.com/200/300', 18, false, '2023-12-12');
	const mrHandy = await createRobot('MrHandy', '9001', 'Nuketech', 'http://placekitten.com/200/300', 9001, true, '2076-01-01');
	console.log('Robots Created');
	
	const foldClothes = await createTask('Fold Clothes');
	const makeDinner = await createTask('Cook Meal');
	const cleanKitchen = await createTask('Clean Kitchen');
	const vacuum = await createTask('Vacuum');
	const trimHedges = await createTask('Trim Hedges');
	const wastelandScavenge = await createTask('Scavenge the Wasteland');
	console.log('Tasks Created'); 

	await createRobotTask(laundrybot.id, foldClothes.id);
	await createRobotTask(cookotron.id, makeDinner.id);
	await createRobotTask(cookotron.id, cleanKitchen.id);
	await createRobotTask(cookotronx.id, makeDinner.id);
	await createRobotTask(cookotronx.id, cleanKitchen.id);
	await createRobotTask(cookotronx.id, vacuum.id);
	await createRobotTask(Zoomba.id, vacuum.id);
	await createRobotTask(gardendroid.id, trimHedges.id);
	await createRobotTask(mrHandy.id, foldClothes.id);
	await createRobotTask(mrHandy.id, makeDinner.id);
	await createRobotTask(mrHandy.id, cleanKitchen.id);
	await createRobotTask(mrHandy.id, vacuum.id);
	await createRobotTask(mrHandy.id, trimHedges.id);
	await createRobotTask(mrHandy.id, wastelandScavenge.id);
	console.log("Robots Linked to Tasks")
	
	const johnSmith = await createCustomer('John Smith', 'john.smith@mail.com');
	const janeDoe = await createCustomer('Jane Doe', 'jane.doe@mail.com');
	const barryWinger = await createCustomer('Barry winger', 'barry.winger@mail.com');
	const billGuy = await createCustomer('Bill Guy', 'bill.guy@mail.com');
	const loneWanderer= await createCustomer('Mr. Lone Wanderer', 'gone.fishing@apocalypse.com');
	console.log('Customers Created'); 

	await createRobotCustomer(laundrybot.id, johnSmith.id);
	await createRobotCustomer(cookotron.id, barryWinger.id);
	await createRobotCustomer(Zoomba.id, barryWinger.id);
	await createRobotCustomer(cookotronx.id, janeDoe.id);
	await createRobotCustomer(gardendroid.id, janeDoe.id);
	await createRobotCustomer(laundrybot.id, billGuy.id);
	await createRobotCustomer(cookotronx.id, billGuy.id);
	await createRobotCustomer(mrHandy.id, loneWanderer.id);
	console.log('Robots Linked to Customers');

	client.end();
	console.log('Connection Ended');
}

syncAndSeed();