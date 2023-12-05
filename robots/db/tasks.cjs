const client = require('./client.cjs');

const createTask = async (name) => {
	try {
		const { rows: [task] } = await client.query(`
			INSERT INTO tasks (name)
			VALUES ('${name}')
			RETURNING *;
		`)
		return task;
	} catch (err) {
		console.log(err);
	}
}

const getAllTasks = async () => {
	try {
		const {rows} = await client.query(`
		SELECT * FROM tasks;
		`);
		return rows;
	} catch (err) {
		console.log(err);
	}
}

module.exports = { createTask, getAllTasks };